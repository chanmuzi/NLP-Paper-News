#!/usr/bin/env python3
"""
GitHub PR 라우터 스크립트
PR 내용을 분석하여 적절한 처리 방식을 결정하고 실행하는 스크립트
"""

import os
import re
import json
import yaml
from datetime import datetime
from typing import Dict, Any, List, Optional
import subprocess

def analyze_pr_changes() -> Dict[str, Any]:
    """
    PR에서 변경된 파일들을 분석하여 처리 방식을 결정
    """
    changes = {
        'has_json_changes': False,
        'has_readme_changes': False,
        'json_file_path': None,
        'readme_file_path': None,
        'pr_type': 'unknown'
    }
    
    # git diff로 변경된 파일 확인
    try:
        result = subprocess.run(['git', 'diff', '--name-only', 'HEAD~1'], 
                              capture_output=True, text=True, check=True)
        changed_files = result.stdout.strip().split('\n')
        
        for file_path in changed_files:
            if file_path == 'data/items.json':
                changes['has_json_changes'] = True
                changes['json_file_path'] = file_path
            elif file_path == 'README.md':
                changes['has_readme_changes'] = True
                changes['readme_file_path'] = file_path
        
        # 처리 방식 결정
        if changes['has_json_changes'] and not changes['has_readme_changes']:
            changes['pr_type'] = 'json_to_readme'
        elif changes['has_readme_changes'] and not changes['has_json_changes']:
            changes['pr_type'] = 'readme_to_json'
        elif changes['has_json_changes'] and changes['has_readme_changes']:
            changes['pr_type'] = 'both_changed'
        else:
            changes['pr_type'] = 'no_relevant_changes'
            
    except subprocess.CalledProcessError as e:
        print(f"Git diff 실행 오류: {e}")
    
    return changes

def parse_pr_body(pr_body: str) -> Dict[str, Any]:
    """
    PR body에서 추가 정보 파싱
    """
    data = {}
    
    # 추가 유형 파싱
    if '단일 항목 (JSON 형식)' in pr_body:
        data['type'] = 'single_item'
    elif '여러 항목 (마크다운 형식)' in pr_body:
        data['type'] = 'multiple_items'
    elif 'README.md 직접 수정' in pr_body:
        data['type'] = 'readme_direct'
    else:
        data['type'] = 'unknown'
    
    # JSON 형식 데이터 추출
    json_match = re.search(r'```json\s*(.*?)\s*```', pr_body, re.DOTALL)
    if json_match:
        try:
            data['json_data'] = json.loads(json_match.group(1))
        except json.JSONDecodeError as e:
            print(f"JSON 파싱 오류: {e}")
    
    # 마크다운 형식 데이터 추출
    md_match = re.search(r'```markdown\s*(.*?)\s*```', pr_body, re.DOTALL)
    if md_match:
        data['markdown_data'] = md_match.group(1).strip()
    
    return data

def sync_json_to_readme(json_file_path: str) -> bool:
    """
    JSON 파일의 변경사항을 README.md에 반영
    """
    try:
        # JSON 파일 읽기
        with open(json_file_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        
        # 새로운 항목들을 README.md에 추가
        new_items = json_data.get('items', [])
        
        # README.md 읽기
        with open('README.md', 'r', encoding='utf-8') as f:
            readme_content = f.read()
        
        # 각 항목을 README.md에 추가
        for item in new_items:
            if add_item_to_readme_from_json(item, readme_content):
                readme_content = add_item_to_readme_from_json(item, readme_content)
        
        # README.md 저장
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(readme_content)
        
        return True
        
    except Exception as e:
        print(f"JSON to README 동기화 오류: {e}")
        return False

def add_item_to_readme_from_json(item: Dict[str, Any], readme_content: str) -> str:
    """
    JSON 항목을 README.md에 추가
    """
    # 마크다운 항목 생성
    emoji_map = {
        'paper': '📜',
        'dev': '🧑🏻‍💻',
        'news': '🗞️'
    }
    
    emoji = emoji_map.get(item.get('type', ''), '📄')
    org = item.get('org', 'Unknown')
    title = item.get('title', 'Untitled')
    url = item.get('url', '#')
    
    # 마크다운 항목 생성
    item_markdown = f"- {emoji} [{org}] [{title}]({url})"
    
    # bullet points 추가
    bullets = item.get('bullets', [])
    for bullet in bullets:
        if isinstance(bullet, str):
            item_markdown += f"\n  - {bullet}"
        elif isinstance(bullet, dict):
            level = bullet.get('level', 0)
            text = bullet.get('text', '')
            indent = "  " * (level + 1)
            item_markdown += f"\n{indent}- {text}"
    
    # 해당 연도/월/주차 섹션에 추가
    year = item.get('year', '2025')
    month = item.get('month', '8')
    week = item.get('week', '1')
    
    return add_item_to_readme_section(item_markdown, year, month, week, readme_content)

def add_item_to_readme_section(item_markdown: str, year: str, month: str, week: str, content: str) -> str:
    """
    README.md의 특정 섹션에 항목 추가
    """
    # 해당 연도/월/주차 섹션 찾기
    year_pattern = f"# {year}"
    month_pattern = f"## 🏝️ {month}월"
    week_pattern = f"<summary>{week}(?:st|nd|rd|th) week</summary>"
    
    # 연도 섹션이 없으면 생성
    if not re.search(year_pattern, content):
        content = f"{year_pattern}\n\n{content}"
    
    # 월 섹션이 없으면 생성
    if not re.search(month_pattern, content):
        year_match = re.search(year_pattern, content)
        if year_match:
            insert_pos = year_match.end()
            month_section = f"\n\n{month_pattern}\n\n<details>\n  <summary>{week}st week</summary>\n\n{item_markdown}\n\n</details>\n"
            content = content[:insert_pos] + month_section + content[insert_pos:]
            return content
    
    # 주차 섹션이 없으면 생성
    if not re.search(week_pattern, content):
        month_match = re.search(month_pattern, content)
        if month_match:
            month_end = content.find('\n## ', month_match.end())
            if month_end == -1:
                month_end = len(content)
            
            week_section = f"\n<details>\n  <summary>{week}st week</summary>\n\n{item_markdown}\n\n</details>\n"
            content = content[:month_end] + week_section + content[month_end:]
            return content
    
    # 기존 주차 섹션에 항목 추가
    week_match = re.search(week_pattern, content)
    if week_match:
        details_end = content.find('</details>', week_match.end())
        if details_end != -1:
            insert_pos = details_end
            content = content[:insert_pos] + f"\n{item_markdown}\n" + content[insert_pos:]
            return content
    
    return content

def sync_readme_to_json() -> bool:
    """
    README.md의 변경사항을 JSON 파일에 반영
    """
    try:
        # 파싱 스크립트 실행
        result = subprocess.run(['python', 'scripts/parse_readme.py'], 
                              capture_output=True, text=True, check=True)
        
        if result.returncode == 0:
            print("README.md to JSON 동기화 완료")
            return True
        else:
            print(f"파싱 스크립트 실행 오류: {result.stderr}")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"README to JSON 동기화 오류: {e}")
        return False

def process_markdown_items(markdown_data: str) -> bool:
    """
    마크다운 형식의 여러 항목을 처리
    """
    try:
        # 마크다운 항목들을 파싱하여 JSON에 추가
        items = parse_markdown_items(markdown_data)
        
        # JSON 파일 읽기
        with open('data/items.json', 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        
        # 새로운 항목들 추가
        json_data['items'].extend(items)
        json_data['total_items'] = len(json_data['items'])
        json_data['last_updated'] = datetime.now().isoformat()
        
        # JSON 파일 저장
        with open('data/items.json', 'w', encoding='utf-8') as f:
            json.dump(json_data, f, ensure_ascii=False, indent=2)
        
        # README.md에도 동기화
        return sync_json_to_readme('data/items.json')
        
    except Exception as e:
        print(f"마크다운 항목 처리 오류: {e}")
        return False

def parse_markdown_items(markdown_data: str) -> List[Dict[str, Any]]:
    """
    마크다운 형식의 항목들을 파싱하여 JSON 형식으로 변환
    """
    items = []
    lines = markdown_data.split('\n')
    
    current_item = None
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # 항목 헤더 패턴: "- [이모지] [Org] [Title](URL)"
        header_match = re.match(r'^-+\s*([^\s]+)\s*\[([^\]]+)\]\s*\[([^\]]+)\]\((https?://[^\)]+)\)\s*$', line)
        if header_match:
            # 이전 항목 저장
            if current_item:
                items.append(current_item)
            
            # 새 항목 시작
            emoji, org, title, url = header_match.groups()
            current_item = {
                'id': f"{org}-{re.sub(r'[^\w\s-]', '', title.lower()).replace(' ', '-')}",
                'date': f"2025-08-W01",  # 기본값, 실제로는 PR에서 받아야 함
                'year': '2025',
                'month': '8',
                'week': '1',
                'type': 'paper' if emoji == '📜' else 'dev' if emoji == '🧑🏻‍💻' else 'news',
                'org': org,
                'title': title.replace('**', ''),
                'url': url,
                'bullets': [],
                'tags': []
            }
        elif current_item and line.startswith('- '):
            # bullet point
            bullet_text = line[2:].strip()
            current_item['bullets'].append(bullet_text)
    
    # 마지막 항목 저장
    if current_item:
        items.append(current_item)
    
    return items

def main():
    """메인 함수"""
    pr_number = os.getenv('PR_NUMBER')
    pr_title = os.getenv('PR_TITLE', '')
    pr_body = os.getenv('PR_BODY', '')
    
    if not pr_number:
        print("PR_NUMBER 환경 변수가 설정되지 않았습니다.")
        return
    
    print(f"PR #{pr_number} 처리 중...")
    print(f"제목: {pr_title}")
    
    # PR 변경사항 분석
    changes = analyze_pr_changes()
    print(f"변경사항 분석: {changes}")
    
    # PR body 파싱
    pr_data = parse_pr_body(pr_body)
    print(f"PR 데이터: {pr_data}")
    
    # 처리 방식에 따른 실행
    success = False
    
    if changes['pr_type'] == 'json_to_readme':
        print("JSON to README 동기화 실행")
        success = sync_json_to_readme(changes['json_file_path'])
    elif changes['pr_type'] == 'readme_to_json':
        print("README to JSON 동기화 실행")
        success = sync_readme_to_json()
    elif changes['pr_type'] == 'both_changed':
        print("양방향 동기화 실행")
        success = sync_readme_to_json() and sync_json_to_readme('data/items.json')
    elif pr_data['type'] == 'multiple_items' and 'markdown_data' in pr_data:
        print("마크다운 항목 처리 실행")
        success = process_markdown_items(pr_data['markdown_data'])
    else:
        print("처리할 수 있는 변경사항이 없습니다.")
        success = True
    
    if success:
        print("PR 처리 완료")
        # docs 폴더에도 동기화
        try:
            subprocess.run(['cp', 'data/items.json', 'docs/data/items.json'], check=True)
            print("docs 폴더 동기화 완료")
        except subprocess.CalledProcessError as e:
            print(f"docs 폴더 동기화 오류: {e}")
    else:
        print("PR 처리 실패")
        exit(1)

if __name__ == "__main__":
    main()
