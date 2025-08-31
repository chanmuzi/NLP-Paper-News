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
    
    # 항목 헤더 패턴: "- [이모지] [Org] [Title](URL)"
    header_pattern = re.compile(
        r'^-+\s*([^\s]+)\s*\[([^\]]+)\]\s*\[([^\]]+)\]\((https?://[^\)]+)\)\s*$',
        re.MULTILINE
    )
    # 이어지는 bullet 라인: "    - 내용"
    bullet_pattern = re.compile(r'^\s{2,}-\s+(.*)$', re.MULTILINE)
    
    # 연도 패턴: "# 2025", "# 2024" 등
    year_pattern = re.compile(r'#\s+(\d{4})')
    
    # 월 패턴: "## 🏝️ August", "## 🍉 July" 등
    month_pattern = re.compile(r'##\s+[🏝️🌱🏕️🙇🏻☔️🎃🏔️🍁🔥🍉🌞🌹🌸]\s+(\w+)')
    
    # 주차 패턴: "<summary>1st week</summary>", "<summary>2nd week</summary>" 등
    week_pattern = re.compile(r'<summary>(\d+)(?:st|nd|rd|th)\s+week</summary>')
    
    # 현재 연도와 월, 주차 초기화
    current_year = "2025"
    current_month = "Unknown"
    current_week = "Unknown"
    
    # 연도별로 내용을 분리하여 처리
    year_sections = year_pattern.finditer(md_content)
    year_positions = [(m.start(), m.group(1)) for m in year_sections]
    
    for i, (year_start, year) in enumerate(year_positions):
        current_year = year
        # 다음 연도까지의 범위 계산
        year_end = year_positions[i + 1][0] if i + 1 < len(year_positions) else len(md_content)
        year_content = md_content[year_start:year_end]
        
        # 월별로 내용을 분리하여 처리
        month_sections = month_pattern.finditer(year_content)
        month_positions = [(m.start(), m.group(1)) for m in month_sections]
        
        for j, (month_start, month) in enumerate(month_positions):
            current_month = month
            # 다음 월까지의 범위 계산
            month_end = month_positions[j + 1][0] if j + 1 < len(month_positions) else len(year_content)
            month_content = year_content[month_start:month_end]
            
            # 주차별로 내용을 분리하여 처리
            week_sections = week_pattern.finditer(month_content)
            week_positions = [(m.start(), m.group(1)) for m in week_sections]
            
            for k, (week_start, week) in enumerate(week_positions):
                current_week = week
                # 다음 주차까지의 범위 계산
                week_end = week_positions[k + 1][0] if k + 1 < len(week_positions) else len(month_content)
                week_content = month_content[week_start:week_end]
                
                # 해당 주차 내에서 헤더들을 찾아서 처리
                for match in header_pattern.finditer(week_content):
                    icon, org, title, url = match.groups()
                    
                    # 다음 헤더까지의 내용을 가져오기
                    start_pos = match.end()
                    next_match = header_pattern.search(week_content, start_pos)
                    end_pos = next_match.start() if next_match else len(week_content)
                    
                    # bullet points 추출
                    block_content = week_content[start_pos:end_pos]
                    bullets = [b.strip() for b in bullet_pattern.findall(block_content)]
                    
                    # 월을 숫자로 변환
                    month_mapping = {
                        "January": "01", "February": "02", "March": "03", "April": "04",
                        "May": "05", "June": "06", "July": "07", "August": "08",
                        "September": "09", "October": "10", "November": "11", "December": "12"
                    }
                    
                    month_num = month_mapping.get(current_month, "00")
                    
                    # 아이콘을 타입으로 변환
                    type_mapping = {
                        "📜": "paper",
                        "🧑🏻‍💻": "dev", 
                        "🗞️": "news"
                    }
                    
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
                        # 간단한 키워드 추출 (더 정교한 로직 필요시 개선 가능)
                        if any(keyword in bullet.lower() for keyword in ["llm", "ai", "machine learning", "deep learning"]):
                            tags.append("AI/ML")
                        if any(keyword in bullet.lower() for keyword in ["reasoning", "thinking", "cot"]):
                            tags.append("reasoning")
                        if any(keyword in bullet.lower() for keyword in ["agent", "tool", "mcp"]):
                            tags.append("agent")
                        if any(keyword in bullet.lower() for keyword in ["multimodal", "vision", "image"]):
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
                        "url": url.strip(),
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
