#!/usr/bin/env python3
"""
이슈 라우터 스크립트
이슈의 명령어를 파싱하여 items.json을 수정하고 PR을 생성
"""

import os
import json
import re
import pathlib
from datetime import datetime
from typing import Dict, Any, List, Optional

def parse_issue_body(body: str) -> Dict[str, Any]:
    """
    이슈 본문을 파싱하여 항목 정보 추출
    
    Args:
        body: 이슈 본문
        
    Returns:
        파싱된 항목 정보
    """
    # 기본 정보 추출
    org_match = re.search(r'**조직/출처:**\s*(.+)', body)
    title_match = re.search(r'**제목:**\s*(.+)', body)
    url_match = re.search(r'**링크:**\s*(.+)', body)
    type_match = re.search(r'**타입:**\s*(.+)', body)
    bullets_match = re.search(r'**요약:**\s*```(.+?)```', body, re.DOTALL)
    
    if not all([org_match, title_match, url_match]):
        return None
    
    # bullets 처리
    bullets = []
    if bullets_match:
        bullet_text = bullets_match.group(1).strip()
        bullets = [line.strip() for line in bullet_text.split('\n') if line.strip()]
    
    # 타입 결정
    item_type = "paper"  # 기본값
    if type_match:
        type_text = type_match.group(1).strip().lower()
        if "dev" in type_text or "개발" in type_text:
            item_type = "dev"
        elif "news" in type_text or "뉴스" in type_text:
            item_type = "news"
    
    return {
        "org": org_match.group(1).strip(),
        "title": title_match.group(1).strip(),
        "url": url_match.group(1).strip(),
        "type": item_type,
        "bullets": bullets
    }

def create_new_item(item_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    새로운 항목 생성
    
    Args:
        item_data: 파싱된 항목 데이터
        
    Returns:
        완성된 항목 객체
    """
    # ID 생성
    clean_title = re.sub(r'[^\w\s-]', '', item_data["title"].lower())
    id_base = f"{item_data['org']}-{clean_title}"
    id_base = re.sub(r'[-\s]+', '-', id_base).strip('-')
    
    # 태그 추출
    tags = []
    for bullet in item_data["bullets"]:
        if any(keyword in bullet.lower() for keyword in ["llm", "ai", "machine learning", "deep learning"]):
            tags.append("AI/ML")
        if any(keyword in bullet.lower() for keyword in ["reasoning", "thinking", "cot"]):
            tags.append("reasoning")
        if any(keyword in bullet.lower() for keyword in ["agent", "tool", "mcp"]):
            tags.append("agent")
        if any(keyword in bullet.lower() for keyword in ["multimodal", "vision", "image"]):
            tags.append("multimodal")
    
    tags = list(set(tags))
    
    return {
        "id": id_base,
        "date": datetime.now().strftime("%Y-%m"),
        "type": item_data["type"],
        "org": item_data["org"],
        "title": item_data["title"],
        "url": item_data["url"],
        "bullets": item_data["bullets"],
        "tags": tags
    }

def update_items_json(new_item: Dict[str, Any], operation: str = "add") -> bool:
    """
    items.json 파일 업데이트
    
    Args:
        new_item: 새 항목 또는 수정할 항목
        operation: 작업 타입 (add, edit, delete)
        
    Returns:
        성공 여부
    """
    try:
        data_path = pathlib.Path("data/items.json")
        if not data_path.exists():
            print("data/items.json 파일을 찾을 수 없습니다.")
            return False
        
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        if operation == "add":
            # 중복 ID 방지
            existing_ids = [item["id"] for item in data["items"]]
            item_id = new_item["id"]
            counter = 1
            while item_id in existing_ids:
                item_id = f"{new_item['id']}-{counter}"
                counter += 1
            
            new_item["id"] = item_id
            data["items"].append(new_item)
            data["total_items"] = len(data["items"])
            data["last_updated"] = datetime.now().isoformat()
            
        elif operation == "edit":
            # ID로 항목 찾아서 수정
            for i, item in enumerate(data["items"]):
                if item["id"] == new_item["id"]:
                    data["items"][i].update(new_item)
                    data["last_updated"] = datetime.now().isoformat()
                    break
        
        elif operation == "delete":
            # ID로 항목 찾아서 삭제
            data["items"] = [item for item in data["items"] if item["id"] != new_item["id"]]
            data["total_items"] = len(data["items"])
            data["last_updated"] = datetime.now().isoformat()
        
        # 파일 저장
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        return True
        
    except Exception as e:
        print(f"items.json 업데이트 중 오류: {e}")
        return False

def main():
    """메인 함수"""
    # 환경 변수 확인
    issue_number = os.getenv("ISSUE_NUMBER")
    issue_title = os.getenv("ISSUE_TITLE", "")
    issue_body = os.getenv("ISSUE_BODY", "")
    
    if not issue_number:
        print("ISSUE_NUMBER 환경 변수가 설정되지 않았습니다.")
        return
    
    print(f"이슈 #{issue_number} 처리 중...")
    print(f"제목: {issue_title}")
    
    # 이슈 본문 파싱
    item_data = parse_issue_body(issue_body)
    if not item_data:
        print("이슈 본문에서 필수 정보를 추출할 수 없습니다.")
        return
    
    # 새 항목 생성
    new_item = create_new_item(item_data)
    print(f"새 항목 생성: {new_item['title']}")
    
    # items.json 업데이트
    if update_items_json(new_item, "add"):
        print("items.json 업데이트 완료")
        
        # 변경사항 커밋 및 PR 생성 로직은 여기에 추가
        # (GitHub CLI 또는 git 명령어 사용)
        
    else:
        print("items.json 업데이트 실패")

if __name__ == "__main__":
    main()
