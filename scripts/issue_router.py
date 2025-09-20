#!/usr/bin/env python3
"""
GitHub Issue 라우터 스크립트
Issue 내용을 파싱하여 README.md에 항목을 추가하는 스크립트
"""

import os
import re
import json
import subprocess
from datetime import datetime
from typing import Dict, Any, List

def parse_issue_form_data(issue_body: str) -> Dict[str, Any]:
    """
    GitHub Issue form 데이터를 파싱 (새로운 템플릿 형식)
    """
    data = {}
    
    # 각 필드별로 파싱
    patterns = {
        'paper_type': r'### 논문 유형\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'organization': r'### 기관/저자\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'title': r'### 논문 제목\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'url': r'### 논문 링크\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'description': r'### 논문 설명 \(선택사항\)\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'conference': r'### 학회/저널 \(선택사항\)\s*\n\n(.*?)(?=\n###|\n\n---|\Z)',
        'additional_info': r'### 추가 정보 \(선택사항\)\s*\n\n(.*?)(?=\n###|\n\n---|\Z)'
    }
    
    for field, pattern in patterns.items():
        match = re.search(pattern, issue_body, re.DOTALL)
        if match:
            value = match.group(1).strip()
            if value and value != '_No response_':
                data[field] = value
    
    return data

def format_paper_entry(data: Dict[str, Any]) -> str:
    """
    논문 데이터를 README.md 형식으로 변환
    """
    paper_type = data.get('paper_type', '📄 Paper')
    organization = data.get('organization', 'Unknown')
    title = data.get('title', 'Untitled')
    url = data.get('url', '#')
    description = data.get('description', '')
    conference = data.get('conference', '')
    additional_info = data.get('additional_info', '')
    
    # URL 정리
    if url and not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    # 제목과 URL 조합
    if url and url != '#':
        title_with_link = f"[{title}]({url})"
    else:
        title_with_link = title
    
    # 학회 정보 추가
    if conference:
        title_with_link += f" ({conference})"
    
    # 설명 조합
    summary_parts = []
    if description:
        summary_parts.append(description)
    if additional_info:
        summary_parts.append(additional_info)
    
    summary = ' '.join(summary_parts) if summary_parts else ''
    
    # README.md 형식으로 포맷팅
    entry = f"- {paper_type} **{organization}** {title_with_link}"
    if summary:
        entry += f" - {summary}"
    
    return entry

def find_insert_position(readme_content: str, paper_type: str) -> int:
    """
    README.md에서 적절한 삽입 위치 찾기
    """
    lines = readme_content.split('\n')
    
    # 논문 유형에 따른 섹션 찾기
    section_patterns = {
        '📜': '## 📜 Papers',
        '🧑🏻‍💻': '## 🧑🏻‍💻 Code',
        '🗞️': '## 🗞️ News'
    }
    
    target_section = section_patterns.get(paper_type, '## 📜 Papers')
    
    for i, line in enumerate(lines):
        if line.strip() == target_section:
            # 섹션 헤더 다음 줄부터 찾기
            for j in range(i + 1, len(lines)):
                if lines[j].strip().startswith('## '):
                    return j
            return len(lines)
    
    # 기본적으로 Papers 섹션에 추가
    for i, line in enumerate(lines):
        if line.strip() == '## 📜 Papers':
            for j in range(i + 1, len(lines)):
                if lines[j].strip().startswith('## '):
                    return j
            return len(lines)
    
    return len(lines)

def add_paper_to_readme(paper_entry: str, paper_type: str) -> bool:
    """
    README.md에 논문 항목 추가
    """
    try:
        # README.md 읽기
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 삽입 위치 찾기
        insert_pos = find_insert_position(content, paper_type)
        
        # 내용 삽입
        lines = content.split('\n')
        lines.insert(insert_pos, paper_entry)
        
        # 파일 저장
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print(f"논문이 README.md에 추가되었습니다: {paper_entry}")
        return True
        
    except Exception as e:
        print(f"README.md 업데이트 실패: {e}")
        return False

def main():
    """
    메인 함수 - GitHub Actions에서 호출
    """
    # GitHub 환경 변수에서 이슈 정보 가져오기
    issue_body = os.environ.get('ISSUE_BODY', '')
    issue_title = os.environ.get('ISSUE_TITLE', '')
    
    if not issue_body:
        print("이슈 본문을 찾을 수 없습니다.")
        return
    
    # 이슈가 닫힌 상태인지 확인
    issue_state = os.environ.get('ISSUE_STATE', '')
    if issue_state != 'closed':
        print("이슈가 아직 열려있습니다.")
        return
    
    # 이슈 제목이 [ADD]로 시작하는지 확인
    if not issue_title.startswith('[ADD]'):
        print("추가 요청이 아닙니다.")
        return
    
    print(f"이슈 처리 시작: {issue_title}")
    print(f"이슈 본문: {issue_body[:200]}...")
    
    # 이슈 데이터 파싱
    data = parse_issue_form_data(issue_body)
    print(f"파싱된 데이터: {data}")
    
    if not data.get('title') or not data.get('organization'):
        print("필수 정보가 부족합니다.")
        return
    
    # 논문 항목 생성
    paper_entry = format_paper_entry(data)
    print(f"생성된 항목: {paper_entry}")
    
    # README.md에 추가
    if add_paper_to_readme(paper_entry, data.get('paper_type', '📜 Paper')):
        print("논문 추가 완료!")
        
        # 파싱 스크립트 실행하여 JSON 업데이트
        try:
            subprocess.run(['python3', 'scripts/parse_readme.py'], check=True)
            print("JSON 업데이트 완료")
        except subprocess.CalledProcessError as e:
            print(f"JSON 업데이트 실패: {e}")
    else:
        print("논문 추가 실패")

if __name__ == "__main__":
    main()