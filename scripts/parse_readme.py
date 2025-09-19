#!/usr/bin/env python3
"""
README.md 파싱 스크립트
README.md의 논문/개발자블로그/뉴스 항목들을 파싱하여 정규화된 JSON 형태로 변환
"""

import re
import json
import pathlib
from datetime import datetime
from typing import List, Dict, Any

def parse_readme_to_items(md_content: str) -> List[Dict[str, Any]]:
    """
    README.md 내용을 파싱하여 items 리스트로 변환
    
    Args:
        md_content: README.md 파일의 전체 내용
        
    Returns:
        파싱된 items 리스트
    """
    items = []
    
    # 항목 헤더 패턴: 다양한 형태를 모두 처리
    # 1. - 📜 [Org] [Title](URL) (학회명)
    # 2. - 🧑🏻‍💻 [Org] [Title](URL)
    # 3. - 📜 [Org] Title (링크 없음)
    # 4. - 🧑🏻‍💻 [Org](URL) (제목 없음)
    header_pattern = re.compile(
        r'^-+\s*([^\s]+)\s*\[([^\]]+)\](?:\s*\[([^\]]+)\](?:\(([^)]+)\))?\s*)?(?:\(([^)]+)\))?\s*(.*)$',
        re.MULTILINE
    )
    # 이어지는 bullet 라인: "    - 내용" (들여쓰기 레벨 감지)
    bullet_pattern = re.compile(r'^(\s*)-\s+(.*)$', re.MULTILINE)
    
    # 연도 패턴: "# 2025", "# 2024" 등
    year_pattern = re.compile(r'#\s+(\d{4})')
    
    # 월 패턴: "## 🏝️ 8월", "## 🍉 7월" 등 (이모지 종류라면 전부 탐지)
    month_pattern = re.compile(r'##\s+[^\s]+\s+(\d+)월')
    
    # 주차 패턴: "<summary>1st week</summary>", "<summary>2nd week</summary>" 등
    week_pattern = re.compile(r'<summary>(\d+)(?:st|nd|rd|th)\s+week</summary>')
    
    # 모든 항목을 찾기
    for header_match in header_pattern.finditer(md_content):
        groups = header_match.groups()
        icon = groups[0]
        org = groups[1]
        title_in_brackets = groups[2]  # [Title] 형태의 제목
        url_in_title = groups[3]  # [Title](URL) 형태의 URL
        url_standalone = groups[4]  # (URL) 형태의 URL
        remaining_text = groups[5]  # 나머지 텍스트 (학회명 등)
        
        # URL 결정 (여러 위치에서 URL 찾기)
        url = url_in_title or url_standalone or ""
        
        # 제목 결정 로직
        if title_in_brackets:
            # [Title] 형태가 있으면 사용
            title = title_in_brackets
        elif remaining_text and not url:
            # 링크가 없고 나머지 텍스트가 있으면 제목으로 사용
            title = remaining_text.strip()
        else:
            # 그 외의 경우 org를 제목으로 사용
            title = org
        
        # URL이 없으면 빈 문자열로 설정
        if not url:
            url = ""
        
        item_pos = header_match.start()
        
        # 해당 항목의 위치를 기준으로 가장 가까운 연도/월/주차 찾기
        current_year = "Unknown"
        current_month = "Unknown"
        current_week = "Unknown"
        
        # 연도 찾기 (항목 위치 이전에서 가장 가까운 연도)
        year_matches = list(year_pattern.finditer(md_content[:item_pos]))
        if year_matches:
            current_year = year_matches[-1].group(1)
        
        # 월 찾기 (항목 위치 이전에서 가장 가까운 월)
        month_matches = list(month_pattern.finditer(md_content[:item_pos]))
        if month_matches:
            current_month = month_matches[-1].group(1)
        
        # 주차 찾기 (항목 위치 이전에서 가장 가까운 주차)
        week_matches = list(week_pattern.finditer(md_content[:item_pos]))
        if week_matches:
            current_week = week_matches[-1].group(1)
        
        
        # 다음 헤더까지의 내용을 가져오기
        start_pos = header_match.end()
        next_header = header_pattern.search(md_content, start_pos)
        end_pos = next_header.start() if next_header else len(md_content)
        
        # bullet points 추출 (계층 구조 유지)
        block_content = md_content[start_pos:end_pos]
        bullets = []
        
        for bullet_match in bullet_pattern.finditer(block_content):
            indent_level = len(bullet_match.group(1))  # 들여쓰기 공백 수
            bullet_text = bullet_match.group(2).strip()
            
            # 들여쓰기 레벨에 따라 계층 구조 생성
            if indent_level == 0:
                # 최상위 레벨 (0칸 들여쓰기)
                bullets.append(bullet_text)
            elif indent_level == 4:
                # 2단계 레벨 (4칸 들여쓰기)
                bullets.append({
                    "text": bullet_text,
                    "level": 1
                })
            elif indent_level == 8:
                # 3단계 레벨 (8칸 들여쓰기)
                bullets.append({
                    "text": bullet_text,
                    "level": 2
                })
            else:
                # 기타 들여쓰기 레벨 (4칸 단위로 계산)
                level = indent_level // 4
                bullets.append({
                    "text": bullet_text,
                    "level": level
                })
        
        # 월을 숫자로 변환 (이미 숫자이므로 0 패딩만 적용)
        month_num = current_month.zfill(2) if current_month.isdigit() else "00"
        
        # 아이콘을 타입으로 변환
        type_mapping = {
            "📜": "paper",
            "🧑🏻‍💻": "dev", 
            "🗞️": "news"
        }
        
        # URL 정리 (프로토콜 추가, 괄호 내 추가 텍스트 제거)
        clean_url = url.strip() if url else ""
        
        if clean_url:
            if not clean_url.startswith(('http://', 'https://')):
                clean_url = 'https://' + clean_url
            
            # 괄호 내 추가 텍스트 제거 (예: (CVPR 2025) 제거)
            clean_url = re.sub(r'\s*\([^)]*\)\s*$', '', clean_url)
        
        # ID 생성 (org-title 기반 slug)
        clean_title = re.sub(r'[^\w\s-]', '', title.lower())
        id_base = f"{org}-{clean_title}"
        id_base = re.sub(r'[-\s]+', '-', id_base).strip('-')
        
        # 중복 ID 방지
        existing_ids = [item["id"] for item in items]
        item_id = id_base
        counter = 1
        while item_id in existing_ids:
            item_id = f"{id_base}-{counter}"
            counter += 1
        
        # 태그 추출 (bullets에서 키워드 추출)
        tags = []
        for bullet in bullets:
            # bullet이 문자열인 경우 (최상위 레벨)
            if isinstance(bullet, str):
                bullet_text = bullet
            else:
                # bullet이 객체인 경우 (서브 레벨)
                bullet_text = bullet["text"]
            
            # 간단한 키워드 추출 (더 정교한 로직 필요시 개선 가능)
            if any(keyword in bullet_text.lower() for keyword in ["llm", "ai", "machine learning", "deep learning"]):
                tags.append("AI/ML")
            if any(keyword in bullet_text.lower() for keyword in ["reasoning", "thinking", "cot"]):
                tags.append("reasoning")
            if any(keyword in bullet_text.lower() for keyword in ["agent", "tool", "mcp"]):
                tags.append("agent")
            if any(keyword in bullet_text.lower() for keyword in ["multimodal", "vision", "image"]):
                tags.append("multimodal")
        
        # 고유 태그만 유지
        tags = list(set(tags))
        
        # 날짜 정보 구성 (연도-월-주차)
        date_info = f"{current_year}-{month_num}-W{current_week.zfill(2)}"
        
        item = {
            "id": item_id,
            "date": date_info,
            "year": current_year,
            "month": current_month,
            "week": current_week,
            "type": type_mapping.get(icon, "unknown"),
            "org": org.strip(),
            "title": title.strip(),
            "url": clean_url,
            "bullets": bullets,
            "tags": tags
        }
        
        items.append(item)
    
    return items

def main():
    """메인 함수"""
    # README.md 파일 읽기
    readme_path = pathlib.Path("README.md")
    if not readme_path.exists():
        print("README.md 파일을 찾을 수 없습니다.")
        return
    
    print("README.md 파일을 파싱 중...")
    md_content = readme_path.read_text(encoding="utf-8")
    
    # 파싱 실행
    items = parse_readme_to_items(md_content)
    
    # 결과 출력
    print(f"총 {len(items)}개의 항목을 파싱했습니다.")
    
    # data 디렉토리 생성
    data_dir = pathlib.Path("data")
    data_dir.mkdir(exist_ok=True)
    
    # JSON 파일로 저장
    output_data = {
        "version": 1,
        "last_updated": datetime.now().isoformat(),
        "total_items": len(items),
        "items": items
    }
    
    output_path = data_dir / "items.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"결과를 {output_path}에 저장했습니다.")
    
    # 간단한 통계 출력
    type_counts = {}
    year_counts = {}
    month_counts = {}
    
    for item in items:
        item_type = item["type"]
        year = item["year"]
        month = item["month"]
        
        type_counts[item_type] = type_counts.get(item_type, 0) + 1
        year_counts[year] = year_counts.get(year, 0) + 1
        month_counts[month] = month_counts.get(month, 0) + 1
    
    print("\n항목 타입별 통계:")
    for item_type, count in type_counts.items():
        print(f"  {item_type}: {count}개")
    
    print("\n연도별 통계:")
    for year, count in sorted(year_counts.items()):
        print(f"  {year}: {count}개")
    
    print("\n월별 통계:")
    for month, count in sorted(month_counts.items()):
        print(f"  {month}: {count}개")
    
    # 샘플 항목 출력
    if items:
        print(f"\n첫 번째 항목 샘플:")
        sample = items[0]
        print(f"  ID: {sample['id']}")
        print(f"  제목: {sample['title']}")
        print(f"  조직: {sample['org']}")
        print(f"  타입: {sample['type']}")
        print(f"  날짜: {sample['date']} (연도: {sample['year']}, 월: {sample['month']}, 주차: {sample['week']})")
        print(f"  태그: {', '.join(sample['tags'])}")

if __name__ == "__main__":
    main()
