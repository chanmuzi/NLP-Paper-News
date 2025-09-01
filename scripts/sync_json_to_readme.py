#!/usr/bin/env python3
"""
JSON to README 동기화 스크립트
JSON 파일의 변경사항을 README.md에 반영하는 스크립트
"""

import json
import re
from datetime import datetime
from typing import Dict, Any, List

def load_json_data(json_file_path: str) -> Dict[str, Any]:
    """
    JSON 파일에서 데이터 로드
    """
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"JSON 파일 로드 오류: {e}")
        return {}

def load_readme_content(readme_file_path: str) -> str:
    """
    README.md 파일에서 내용 로드
    """
    try:
        with open(readme_file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"README.md 파일 로드 오류: {e}")
        return ""

def save_readme_content(content: str, readme_file_path: str) -> bool:
    """
    README.md 파일에 내용 저장
    """
    try:
        with open(readme_file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"README.md 파일 저장 오류: {e}")
        return False

def json_item_to_markdown(item: Dict[str, Any]) -> str:
    """
    JSON 항목을 마크다운 형식으로 변환
    """
    # 이모지 매핑
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
    
    return item_markdown

def find_or_create_section(content: str, year: str, month: str, week: str) -> str:
    """
    README.md에서 해당 연도/월/주차 섹션을 찾거나 생성
    """
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
            month_section = f"\n\n{month_pattern}\n\n<details>\n  <summary>{week}st week</summary>\n\n</details>\n"
            content = content[:insert_pos] + month_section + content[insert_pos:]
    
    # 주차 섹션이 없으면 생성
    if not re.search(week_pattern, content):
        month_match = re.search(month_pattern, content)
        if month_match:
            month_end = content.find('\n## ', month_match.end())
            if month_end == -1:
                month_end = len(content)
            
            week_section = f"\n<details>\n  <summary>{week}st week</summary>\n\n</details>\n"
            content = content[:month_end] + week_section + content[month_end:]
    
    return content

def add_item_to_readme_section(content: str, item_markdown: str, year: str, month: str, week: str) -> str:
    """
    README.md의 특정 섹션에 항목 추가
    """
    # 섹션 찾기 또는 생성
    content = find_or_create_section(content, year, month, week)
    
    # 주차 섹션에 항목 추가
    week_pattern = f"<summary>{week}(?:st|nd|rd|th) week</summary>"
    week_match = re.search(week_pattern, content)
    
    if week_match:
        # </details> 태그 찾기
        details_end = content.find('</details>', week_match.end())
        if details_end != -1:
            # </details> 태그 앞에 항목 추가
            insert_pos = details_end
            content = content[:insert_pos] + f"\n{item_markdown}\n" + content[insert_pos:]
    
    return content

def sync_json_to_readme(json_file_path: str, readme_file_path: str) -> bool:
    """
    JSON 파일의 변경사항을 README.md에 동기화
    """
    # JSON 데이터 로드
    json_data = load_json_data(json_file_path)
    if not json_data:
        return False
    
    # README.md 내용 로드
    readme_content = load_readme_content(readme_file_path)
    if not readme_content:
        return False
    
    # 새로운 항목들을 README.md에 추가
    items = json_data.get('items', [])
    
    # 연도/월/주차별로 그룹화
    grouped_items = {}
    for item in items:
        year = item.get('year', '2025')
        month = item.get('month', '8')
        week = item.get('week', '1')
        
        key = f"{year}-{month}-{week}"
        if key not in grouped_items:
            grouped_items[key] = []
        grouped_items[key].append(item)
    
    # 각 그룹의 항목들을 README.md에 추가
    for key, group_items in grouped_items.items():
        year, month, week = key.split('-')
        
        for item in group_items:
            item_markdown = json_item_to_markdown(item)
            readme_content = add_item_to_readme_section(
                readme_content, item_markdown, year, month, week
            )
    
    # README.md 저장
    return save_readme_content(readme_content, readme_file_path)

def main():
    """메인 함수"""
    json_file_path = "data/items.json"
    readme_file_path = "README.md"
    
    print("JSON to README 동기화 시작...")
    
    success = sync_json_to_readme(json_file_path, readme_file_path)
    
    if success:
        print("JSON to README 동기화 완료")
    else:
        print("JSON to README 동기화 실패")
        exit(1)

if __name__ == "__main__":
    main()
