# NLP Paper News - GitHub Pages

이 디렉토리는 GitHub Pages를 위한 정적 웹사이트 소스입니다.

## 구조

- `index.html` - 메인 웹 페이지
- `README.md` - 이 파일

## GitHub Pages 설정

1. GitHub 저장소 설정에서 Pages를 활성화
2. Source를 `docs` 폴더로 설정
3. Branch를 `main`으로 설정

## 웹사이트 기능

- 📊 실시간 통계 (전체 항목, 논문, 개발, 뉴스 수)
- 🔍 실시간 검색 (제목, 조직, 내용, 태그)
- 🏷️ 타입별 필터링 (논문, 개발, 뉴스)
- ➕ 새 항목 추가 (GitHub 이슈 템플릿 연동)
- 📱 반응형 디자인

## 데이터 소스

웹사이트는 `../data/items.json` 파일에서 데이터를 불러옵니다.
이 파일은 README.md가 변경될 때마다 자동으로 업데이트됩니다.

## 개발

로컬에서 테스트하려면:

```bash
# Python HTTP 서버 실행
python -m http.server 8000

# 브라우저에서 http://localhost:8000/docs/ 접속
```
