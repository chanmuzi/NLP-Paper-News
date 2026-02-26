# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI/NLP/ML 분야의 최신 논문, 개발자 블로그, 뉴스를 매주 큐레이션하는 풀스택 프로젝트. Astro SSG 기반 웹사이트 + GitHub Actions 기반 X 자동 포스팅 파이프라인으로 구성.

- 웹사이트: https://chanmuzi.github.io/NLP-Paper-News/
- 데이터 소스(SSOT): `data/items.json` (1,600+ 항목)

## Commands

### 프론트엔드 (web/)

```bash
cd web && npm install    # 의존성 설치
cd web && npm run dev    # 로컬 개발 서버 (localhost:4321)
cd web && npm run build  # 정적 빌드 (web/dist/)
cd web && npm run preview # 빌드 결과 미리보기
```

### 스크립트 (scripts/)

```bash
# 항목 추가 (대화형)
node scripts/add-item.mjs --interactive

# 항목 추가 (직접)
node scripts/add-item.mjs --org "OpenAI" --title "Title" --url "https://..." --bullets "point1" "point2"

# X 스레드 생성 (로컬 테스트)
node scripts/build-digest.mjs --input artifacts/new-items.json --out-dir artifacts --site-base-url "https://chanmuzi.github.io/NLP-Paper-News/"
```

## Architecture

### 데이터 흐름

```
data/items.json (단일 소스)
    ↓ 빌드타임 임포트
web/ (Astro SSG → 정적 HTML)
    ↓ GitHub Pages 배포
웹사이트 (검색/북마크는 클라이언트 JS)
```

### X 포스팅 파이프라인

```
items.json 변경 push
    → notify.yml: extract-new-items → build-digest → 아티팩트 업로드
    → 웹 UI에서 승인
    → post-approved.yml: post-x.mjs → X API 게시
```

### 프론트엔드 (web/)

- **Astro 5 SSG** + **Tailwind CSS 3.4** + **TypeScript**
- 주요 페이지: index(홈), search(검색), bookmarks(북마크), admin(항목 관리)
- 클라이언트 기능: 북마크(localStorage), 검색 필터링, 다크모드, GitHub API 연동(항목 추가/삭제)
- Astro 설정: `site: chanmuzi.github.io`, `base: /NLP-Paper-News`, `output: static`

### 스크립트 (scripts/)

Node.js ESM (.mjs) 유틸리티. CI에서 주로 사용:
- `add-item.mjs` - 항목 추가 CLI
- `extract-new-items.mjs` - 이전 커밋 대비 신규 항목 추출
- `build-digest.mjs` - X 스레드 생성 (규칙 기반 또는 OpenAI)
- `post-x.mjs` - X API 게시 (OAuth 1.0a)
- `rewrite-x-thread.mjs` - OpenAI 기반 X 스레드 편집

### CI/CD (.github/workflows/)

- `deploy.yml` - main push 시 GitHub Pages 자동 배포
- `notify.yml` - items.json 변경 감지 → X 스레드 준비
- `post-approved.yml` - 승인된 X 스레드 게시 (workflow_dispatch)
- `rewrite-x-draft.yml` - X 스레드 편집 (workflow_dispatch)

## Key Conventions

### 데이터 모델 (items.json)

```json
{
  "id": "unique-slug",
  "type": "paper|dev|news",
  "org": "기관명",
  "title": "제목",
  "url": "https://...",
  "date": "2026-02-W03",
  "year": "2026", "month": "2", "week": "3",
  "bullets": [{ "text": "설명", "level": 1 }],
  "tags": []
}
```

### X 글자수 계산

- Hard limit: 280자
- URL은 23자로 정규화
- 한글/이모지는 2배 가중 (Grapheme segmenter 사용)
- 안전 한도: `X_SAFE_LIMIT` (기본 260), 생성 여유: `X_GEN_MARGIN` (기본 16)

### 환경 변수

- `ENABLE_X_POST` - X 실제 게시 on/off
- `ENABLE_AI_X_COPY` - OpenAI 카피 생성 on/off
- `OPENAI_API_KEY` - AI 카피 생성 시 필요
- `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` - X API

### artifacts/ 디렉토리

로컬 테스트/디버그 전용 출력 디렉토리. `build-digest.mjs`, `extract-new-items.mjs` 등 스크립트 실행 시 생성되는 산출물(digest.json, social-draft.md, email.html 등)이 저장된다. 모두 재생성 가능한 임시 파일이므로 `.gitignore`에 포함되어 있으며, 커밋하지 않는다.

### Git Push 전 체크

push 전에 로컬 브랜치가 리모트 대비 최신 상태인지 확인한다. 뒤처져 있으면 사용자에게 상황을 보고하고, 어떻게 진행할지(pull, rebase 등) 컨펌을 받은 뒤 실행한다. 임의로 판단하지 않는다.

### 디자인

- Anthropic/Claude 톤: 테라코타, 세이지 그린, 뮤티드 블루 색상 팔레트
- 다크모드: class 기반 (`tailwind.config.mjs`의 커스텀 색상 참조)
- 한국어 UI
