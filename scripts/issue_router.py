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
    텍스트 형식의 Issue 내용 파싱
    """
    data = {}
    
    # 간단한 키-값 파싱
    patterns = {
        'emoji': r'이모지[:\s]*([^\n]+)',
        'organization': r'기관[:\s]*([^\n]+)',
        'title': r'제목[:\s]*([^\n]+)',
        'url': r'링크[:\s]*([^\n]+)',
        'year': r'연도[:\s]*([^\n]+)',
        'month': r'월[:\s]*([^\n]+)',
        'week': r'주차[:\s]*([^\n]+)',
        'summary': r'요약[:\s]*(.*?)(?=\n\n|\n추가|$)',
        'additional_info': r'추가 정보[:\s]*(.*?)(?=\n\n|$)'
    }
    
    for key, pattern in patterns.items():
        match = re.search(pattern, issue_body, re.DOTALL | re.IGNORECASE)
        if match:
            data[key] = match.group(1).strip()
    
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
    README.md에 항목 추가
    """
    try:
        # README.md 읽기
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 해당 연도/월/주차 섹션 찾기
        year_pattern = f"# {year}"
        month_pattern = f"## 🏝️ {month}월"
        week_pattern = f"<summary>{week}(?:st|nd|rd|th) week</summary>"
        
        # 연도 섹션이 없으면 생성
        if not re.search(year_pattern, content):
            content = f"{year_pattern}\n\n{content}"
        
        # 월 섹션이 없으면 생성
        if not re.search(month_pattern, content):
            # 연도 섹션 다음에 월 섹션 추가
            year_match = re.search(year_pattern, content)
            if year_match:
                insert_pos = year_match.end()
                month_section = f"\n\n{month_pattern}\n\n<details>\n  <summary>{week}st week</summary>\n\n{item_markdown}\n\n</details>\n"
                content = content[:insert_pos] + month_section + content[insert_pos:]
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        # 주차 섹션이 없으면 생성
        if not re.search(week_pattern, content):
            # 해당 월 섹션 내에 주차 섹션 추가
            month_match = re.search(month_pattern, content)
            if month_match:
                # 월 섹션의 끝 찾기
                month_end = content.find('\n## ', month_match.end())
                if month_end == -1:
                    month_end = len(content)
                
                week_section = f"\n<details>\n  <summary>{week}st week</summary>\n\n{item_markdown}\n\n</details>\n"
                content = content[:month_end] + week_section + content[month_end:]
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        # 기존 주차 섹션에 항목 추가
        week_match = re.search(week_pattern, content)
        if week_match:
            # 주차 섹션의 </details> 태그 찾기
            details_end = content.find('</details>', week_match.end())
            if details_end != -1:
                # </details> 태그 앞에 항목 추가
                insert_pos = details_end
                content = content[:insert_pos] + f"\n{item_markdown}\n" + content[insert_pos:]
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        return False
        
    except Exception as e:
        print(f"README.md 업데이트 오류: {e}")
        return False

def main():
    """메인 함수"""
    # 환경 변수에서 Issue 정보 가져오기
    issue_number = os.getenv('ISSUE_NUMBER')
    issue_title = os.getenv('ISSUE_TITLE', '')
    issue_body = os.getenv('ISSUE_BODY', '')
    
    if not issue_number:
        print("ISSUE_NUMBER 환경 변수가 설정되지 않았습니다.")
        return
    
    print(f"Issue #{issue_number} 처리 중...")
    print(f"제목: {issue_title}")
    
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