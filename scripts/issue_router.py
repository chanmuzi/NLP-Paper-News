#!/usr/bin/env python3
"""
GitHub Issue 라우터 스크립트
Issue 내용을 파싱하여 README.md에 항목을 추가하는 스크립트
"""

import os
import re
import json
import yaml
from datetime import datetime
from typing import Dict, Any, List

def parse_issue_form_data(issue_body: str) -> Dict[str, Any]:
    """
    GitHub Issue form 데이터를 파싱
    """
    # YAML 형식의 form 데이터 파싱
    try:
        # Issue body에서 YAML 부분 추출
        yaml_match = re.search(r'```yaml\s*(.*?)\s*```', issue_body, re.DOTALL)
        if yaml_match:
            yaml_content = yaml_match.group(1)
            form_data = yaml.safe_load(yaml_content)
            return form_data
    except Exception as e:
        print(f"YAML 파싱 오류: {e}")
    
    # YAML 파싱 실패시 텍스트 파싱 시도
    return parse_text_format(issue_body)

def parse_text_format(issue_body: str) -> Dict[str, Any]:
    """
    텍스트 형식의 Issue 내용 파싱 (새로운 폼 형식 지원)
    """
    data = {}
    
    # JSON 형식 파싱 시도
    json_match = re.search(r'```json\s*(.*?)\s*```', issue_body, re.DOTALL)
    if json_match:
        try:
            json_data = json.loads(json_match.group(1))
            # JSON 키를 기존 키로 매핑
            data = {
                'emoji': json_data.get('emoji', '📄'),
                'organization': json_data.get('org', 'Unknown'),
                'title': json_data.get('title', 'Untitled'),
                'url': json_data.get('url', '#'),
                'summary': json_data.get('summary', ''),
                'year': json_data.get('year', '2025'),
                'month': json_data.get('month', '8'),
                'week': json_data.get('week', '1')
            }
            return data
        except json.JSONDecodeError:
            print("JSON 파싱 실패, 텍스트 파싱으로 전환")
    
    # 마크다운 형식 파싱 시도
    markdown_match = re.search(r'```markdown\s*(.*?)\s*```', issue_body, re.DOTALL)
    if markdown_match:
        markdown_content = markdown_match.group(1).strip()
        # 첫 번째 항목에서 정보 추출
        lines = markdown_content.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('- ') and '[' in line and '](' in line:
                # 마크다운 항목 파싱: "- [이모지] [Org] [Title](URL)"
                match = re.match(r'^-\s+([^\s]+)\s+\[([^\]]+)\]\s+\[([^\]]+)\]\(([^)]+)\)', line)
                if match:
                    data['emoji'] = match.group(1)
                    data['organization'] = match.group(2)
                    data['title'] = match.group(3)
                    data['url'] = match.group(4)
                    # 요약은 다음 줄들에서 추출
                    summary_lines = []
                    for i, next_line in enumerate(lines[lines.index(line)+1:], 1):
                        if next_line.strip().startswith('- ') and '[' in next_line and '](' in next_line:
                            break  # 다음 항목 시작
                        if next_line.strip().startswith('  - '):
                            summary_lines.append(next_line.strip()[4:])  # "  - " 제거
                        elif next_line.strip() and not next_line.startswith('#'):
                            summary_lines.append(next_line.strip())
                    data['summary'] = '\n'.join(summary_lines)
                break
    
    # 추가 정보에서 연도, 월, 주차 추출
    info_patterns = {
        'year': r'연도[:\s]*([^\n]+)',
        'month': r'월[:\s]*([^\n]+)',
        'week': r'주차[:\s]*([^\n]+)'
    }
    
    for key, pattern in info_patterns.items():
        match = re.search(pattern, issue_body, re.DOTALL | re.IGNORECASE)
        if match:
            data[key] = match.group(1).strip()
    
    # 기본값 설정
    data.setdefault('year', '2025')
    data.setdefault('month', '8')
    data.setdefault('week', '1')
    data.setdefault('emoji', '📄')
    data.setdefault('organization', 'Unknown')
    data.setdefault('title', 'Untitled')
    data.setdefault('url', '#')
    data.setdefault('summary', '')
    
    return data

def create_markdown_item(form_data: Dict[str, Any]) -> str:
    """
    Form 데이터로부터 마크다운 항목 생성
    """
    emoji = form_data.get('emoji', '📄')
    org = form_data.get('organization', 'Unknown')
    title = form_data.get('title', 'Untitled')
    url = form_data.get('url', '#')
    summary = form_data.get('summary', '')
    
    # ** 기호 제거
    title = title.replace('**', '')
    
    # 마크다운 항목 생성
    item = f"- {emoji} [{org}] [{title}]({url})"
    
    if summary:
        # 요약을 bullet points로 변환
        summary_lines = summary.split('\n')
        for line in summary_lines:
            line = line.strip()
            if line and not line.startswith('-'):
                item += f"\n  - {line}"
            elif line.startswith('-'):
                item += f"\n  {line}"
    
    return item

def add_item_to_readme(item_markdown: str, year: str, month: str, week: str) -> bool:
    """
    README.md에 항목 추가 (새로운 월/주차 자동 생성 지원)
    """
    try:
        # README.md 읽기
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 숫자 월을 한국어로 변환
        month_korean = f"{month}월"
        week_korean = f"{week}주차"
        
        # 패턴 정의
        year_pattern = f"# {year}"
        month_pattern = f"## 🏝️ {month_korean}"
        week_pattern = f"<summary>{week_korean}</summary>"
        
        # 1. 연도 섹션이 없으면 생성
        if not re.search(year_pattern, content):
            # 맨 위에 연도 섹션 추가
            content = f"{year_pattern}\n\n{content}"
            print(f"새로운 연도 섹션 생성: {year}")
        
        # 2. 월 섹션이 없으면 생성
        if not re.search(month_pattern, content):
            # 연도 섹션 다음에 월 섹션 추가
            year_match = re.search(year_pattern, content)
            if year_match:
                # 연도 섹션 다음 위치 찾기
                year_end = year_match.end()
                next_section = content.find('\n## ', year_end)
                if next_section == -1:
                    next_section = len(content)
                
                # 새로운 월 섹션 생성
                month_section = f"\n\n{month_pattern}\n\n<details>\n  <summary>{week_korean}</summary>\n\n{item_markdown}\n\n</details>\n"
                content = content[:next_section] + month_section + content[next_section:]
                print(f"새로운 월 섹션 생성: {month_korean}")
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        # 3. 주차 섹션이 없으면 생성
        if not re.search(week_pattern, content):
            # 해당 월 섹션 내에 주차 섹션 추가
            month_match = re.search(month_pattern, content)
            if month_match:
                # 월 섹션의 끝 찾기 (다음 월 섹션 또는 연도 섹션까지)
                month_end = month_match.end()
                next_month = content.find('\n## 🏝️ ', month_end)
                next_year = content.find('\n# ', month_end)
                
                # 가장 가까운 다음 섹션 찾기
                if next_month != -1 and next_year != -1:
                    section_end = min(next_month, next_year)
                elif next_month != -1:
                    section_end = next_month
                elif next_year != -1:
                    section_end = next_year
                else:
                    section_end = len(content)
                
                # 새로운 주차 섹션 생성
                week_section = f"\n<details>\n  <summary>{week_korean}</summary>\n\n{item_markdown}\n\n</details>\n"
                content = content[:section_end] + week_section + content[section_end:]
                print(f"새로운 주차 섹션 생성: {week_korean}")
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        # 4. 기존 주차 섹션에 항목 추가
        week_match = re.search(week_pattern, content)
        if week_match:
            # 주차 섹션의 </details> 태그 찾기
            details_end = content.find('</details>', week_match.end())
            if details_end != -1:
                # </details> 태그 앞에 항목 추가
                insert_pos = details_end
                content = content[:insert_pos] + f"\n{item_markdown}\n" + content[insert_pos:]
                print(f"기존 주차 섹션에 항목 추가: {week_korean}")
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        print("항목 추가 실패: 적절한 위치를 찾을 수 없습니다.")
        return False
        
    except Exception as e:
        print(f"README.md 업데이트 오류: {e}")
        return False

def remove_item_from_readme(item_id: str, item_title: str) -> bool:
    """
    README.md에서 항목 삭제
    """
    try:
        # README.md 읽기
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 항목 ID로 삭제할 항목 찾기
        # ID는 보통 org-title 형태로 구성됨
        lines = content.split('\n')
        new_lines = []
        skip_until_details = False
        
        for i, line in enumerate(lines):
            if skip_until_details:
                if '</details>' in line:
                    skip_until_details = False
                continue
            
            # 항목 헤더 라인 찾기 (제목이 포함된 라인)
            if line.strip().startswith('- ') and item_title in line:
                # 이 항목과 관련된 모든 라인 건너뛰기
                skip_until_details = True
                continue
            
            new_lines.append(line)
        
        # 파일 업데이트
        new_content = '\n'.join(new_lines)
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"항목 삭제 완료: {item_title}")
        return True
        
    except Exception as e:
        print(f"항목 삭제 오류: {e}")
        return False

def main():
    """메인 함수"""
    # 환경 변수에서 Issue 정보 가져오기
    issue_number = os.getenv('ISSUE_NUMBER')
    issue_title = os.getenv('ISSUE_TITLE', '')
    issue_body = os.getenv('ISSUE_BODY', '')
    issue_action = os.getenv('ISSUE_ACTION', 'opened')
    
    if not issue_number:
        print("ISSUE_NUMBER 환경 변수가 설정되지 않았습니다.")
        return
    
    print(f"Issue #{issue_number} 처리 중... (Action: {issue_action})")
    print(f"제목: {issue_title}")
    
    # Issue가 닫힌 경우에만 실제 처리 수행
    if issue_action != 'closed':
        print("Issue가 아직 열려있습니다. 닫힐 때까지 대기합니다.")
        return
    
    print("Issue가 닫혔습니다. 승인 처리 시작...")
    
    # 삭제 요청인지 확인
    if '[DELETE]' in issue_title:
        # 삭제 요청 처리
        item_id_match = re.search(r'삭제할 항목 ID[:\s]*`([^`]+)`', issue_body)
        item_title_match = re.search(r'삭제할 항목 제목[:\s]*([^\n]+)', issue_body)
        
        if item_id_match and item_title_match:
            item_id = item_id_match.group(1)
            item_title = item_title_match.group(1).strip()
            
            success = remove_item_from_readme(item_id, item_title)
            if success:
                print("항목 삭제 완료")
                # TODO: 파싱 스크립트 실행하여 JSON 업데이트
                # TODO: GitHub에 커밋 및 푸시
            else:
                print("항목 삭제 실패")
        else:
            print("삭제할 항목 정보를 찾을 수 없습니다.")
        return
    
    # 일반 추가 요청 처리
    # Issue 내용 파싱
    form_data = parse_issue_form_data(issue_body)
    print(f"파싱된 데이터: {form_data}")
    
    # 마크다운 항목 생성
    item_markdown = create_markdown_item(form_data)
    print(f"생성된 마크다운:\n{item_markdown}")
    
    # README.md에 추가
    year = form_data.get('year', '2025')
    month = form_data.get('month', '8')
    week = form_data.get('week', '1')
    
    success = add_item_to_readme(item_markdown, year, month, week)
    
    if success:
        print("README.md 업데이트 완료")
        # TODO: 파싱 스크립트 실행하여 JSON 업데이트
        # TODO: GitHub에 커밋 및 푸시
    else:
        print("README.md 업데이트 실패")

if __name__ == "__main__":
    main()