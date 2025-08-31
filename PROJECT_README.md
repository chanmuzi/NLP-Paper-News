# 📚 NLP Paper News Manager

논문 요약 및 관리 웹 애플리케이션입니다. README.md에 작성된 논문 요약 내용을 웹으로 관리하고, 새로운 논문을 쉽게 추가할 수 있습니다.

## ✨ 주요 기능

### 🔍 실시간 검색

- **빠른 검색**: 기존 cmd+f 문제를 해결한 인덱스 기반 검색
- **필터링**: 카테고리, 태그별 필터링
- **정렬**: 날짜, 제목, 카테고리별 정렬

### 📝 논문 관리

- **개별 추가**: 폼을 통한 논문 등록
- **일괄 추가**: README.md 형식 텍스트를 붙여넣어 자동 파싱
- **편집/삭제**: 기존 논문 수정 및 삭제

### 🏷️ 태그 시스템

- **자동 태그 생성**: 요약 내용에서 AI/ML 관련 태그 자동 추출
- **태그 관리**: 태그별 분류 및 검색
- **태그 제안**: 기존 태그 기반 자동완성

### 📱 반응형 디자인

- **모바일 최적화**: 모든 디바이스에서 최적의 사용자 경험
- **다크 모드**: 시스템 설정에 따른 자동 테마 전환
- **접근성**: 키보드 단축키 및 스크린 리더 지원

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/yourusername/NLP-Paper-News.git
cd NLP-Paper-News
```

### 2. GitHub Pages 활성화

1. 저장소 설정 → Pages
2. Source를 "Deploy from a branch"로 설정
3. Branch를 "main"으로 설정
4. Save 클릭

### 3. 웹사이트 접속

`https://yourusername.github.io/NLP-Paper-News`에서 확인

## 📖 사용법

### 메인 페이지

- **검색**: 상단 검색바에서 논문, 태그, 내용으로 검색
- **필터**: 카테고리, 태그, 정렬 기준 선택
- **논문 카드**: 각 논문의 요약 정보를 카드 형태로 표시

### 논문 추가

1. **개별 추가**: `➕ 추가` 메뉴에서 폼 작성
2. **일괄 추가**: `📝 일괄추가` 메뉴에서 README.md 형식 텍스트 붙여넣기

### README.md 형식

```markdown
- 📜 [OpenAI] [GPT-5 is here](https://openai.com/gpt-5/)
  - real-time router를 통해 reasoning 여부를 결정하고 적절한 모델을 선정하여 답변함
  - coding 능력이 크게 향상되어 타 frontier 모델들 수준으로 올라왔다고 보고
  - o3-pro처럼 더 오래 생각하는 test-time scaling 방식이 적용된 GPT-5 pro 모델
```

## 🛠️ 기술 스택

### Frontend

- **HTML5**: 시맨틱 마크업
- **CSS3**: Grid, Flexbox, CSS Variables
- **Vanilla JavaScript**: ES6+ 모던 자바스크립트

### 기능

- **Local Storage**: 브라우저 기반 데이터 저장
- **Indexed Search**: 빠른 검색을 위한 인덱싱
- **Responsive Design**: 모바일 퍼스트 접근법

### 호스팅

- **GitHub Pages**: 정적 웹사이트 호스팅
- **Jekyll**: 정적 사이트 생성기 (선택사항)

## 📁 프로젝트 구조

```
NLP-Paper-News/
├── index.html              # 메인 페이지
├── add.html                # 개별 추가 페이지
├── batch-add.html          # 일괄 추가 페이지
├── assets/
│   ├── css/                # 스타일시트
│   │   ├── main.css        # 메인 스타일
│   │   ├── components.css  # 컴포넌트 스타일
│   │   └── responsive.css  # 반응형 스타일
│   └── js/                 # 자바스크립트
│       ├── utils.js        # 유틸리티 함수
│       ├── storage.js      # 데이터 관리
│       ├── parser.js       # README 파서
│       ├── search.js       # 검색 엔진
│       ├── app.js          # 메인 애플리케이션
│       ├── add.js          # 추가 페이지
│       └── batch-add.js    # 일괄 추가 페이지
├── _config.yml             # GitHub Pages 설정
└── README.md               # 프로젝트 설명
```

## 🔧 커스터마이징

### 테마 변경

`assets/css/main.css`에서 색상 변수 수정:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #f8f9fa;
}
```

### 카테고리 추가

`assets/js/parser.js`에서 카테고리 매핑 수정:

```javascript
this.categoryMap = {
  "📜": "📜 논문",
  "🧑🏻‍💻": "🧑🏻‍💻 개발자 블로그",
  "🗞️": "🗞️ 뉴스",
  "🎯": "🎯 새로운 카테고리", // 추가
};
```

## 📱 반응형 브레이크포인트

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ⌨️ 키보드 단축키

- **Ctrl/Cmd + K**: 검색창 포커스
- **Ctrl/Cmd + F**: 검색창 포커스 (대안)
- **Escape**: 검색 초기화
- **화살표 키**: 페이지네이션

## 🔒 데이터 보안

- **로컬 저장**: 모든 데이터는 브라우저 로컬 스토리지에 저장
- **데이터 내보내기**: JSON 형태로 데이터 백업 가능
- **자동 저장**: 30초마다 자동으로 폼 데이터 저장

## 🚀 향후 계획

### Phase 2: 고급 기능

- [ ] 그래프 시각화 (D3.js)
- [ ] API 연동 (arXiv, Papers With Code)
- [ ] 협업 기능
- [ ] 클라우드 동기화

### Phase 3: 확장

- [ ] PWA 지원
- [ ] 오프라인 모드
- [ ] 다국어 지원
- [ ] 고급 분석 도구

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **GitHub Issues**: [프로젝트 이슈](https://github.com/yourusername/NLP-Paper-News/issues)
- **Email**: your.email@example.com

## 🙏 감사의 말

- [GitHub Pages](https://pages.github.com/) - 무료 호스팅 제공
- [Font Awesome](https://fontawesome.com/) - 아이콘 제공
- [Google Fonts](https://fonts.google.com/) - 웹폰트 제공

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
