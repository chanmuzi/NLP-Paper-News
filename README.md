# NLP Paper News

AI, NLP, ML 분야의 최신 논문, 개발자 블로그, 뉴스를 매주 큐레이션하는 레포입니다.

## 어떤 내용을 정리하나요?

- **Papers** - 주요 연구 논문 및 요약
- **Dev** - 개발자 블로그, GitHub 릴리즈, 기술 문서
- **News** - AI/ML 업계 뉴스

2024년부터 현재까지 1,651건 이상의 항목을 정리하고 있습니다.

## 웹사이트

정리된 항목들은 아래 웹사이트에서 검색, 필터링하여 확인할 수 있습니다.

**[https://chanmuzi.github.io/NLP-Paper-News/](https://chanmuzi.github.io/NLP-Paper-News/)**

## 자동 X 포스팅

- admin UI(`/admin`)에서 신규 항목 추가 시 X 스레드 드래프트가 준비되고, 사용자 승인을 거쳐 X에 게시됩니다 (또는 Claude Code의 `/post`로 1-step 게시).
- 워크플로우:
  - `.github/workflows/notify.yml` (`Prepare X Thread Draft`) — admin UI의 `workflow_dispatch` 호출로 트리거되어 신규 항목을 감지하고 스레드 드래프트를 준비합니다.
  - `.github/workflows/post-approved.yml` — 승인된 스레드를 X에 게시합니다 (`ENABLE_X_POST` 변수로 on/off).
- 게시 실패 시 수동 포스팅용 초안 아티팩트(`social-draft.md`)를 남깁니다.

운영 방법은 `docs/notification-runbook.md`를 참고하세요.

## Claude Code 기반 1-step 게시 (`/post`)

`/summarize` 결과를 admin 웹에 복붙·승인할 필요 없이 Claude Code 한 번의 대화로 **X 스레드 작성 → 검증 → 게시 → `data/items.json` 갱신·푸시**까지 마칠 수 있습니다.

```
/post https://example.com/url1 https://example.com/url2
```

- **1회 환경 설정**: `.envrc`에 `X_API_KEY` 등 4개 값 채우고 `direnv allow`. `.envrc`는 `.gitignore`와 Claude read deny 룰로 보호됩니다.
- **흐름**: URL 요약(마크다운) → X 메인+리플라이+가중 글자수 → 사용자 응답(`게시` / `드라이런` / `수정: ...`) → 게시 + 푸시.
- **안전장치**: 280자 가중 검증(`scripts/x-length.mjs`), 게시 전 중복 검사(`scripts/check-duplicates.mjs`), 게시 실패 시 자동 롤백 또는 `main_only` degraded mode.
- **기존 admin 흐름은 그대로** — 모바일·외부에서는 평소처럼 웹 admin으로 게시 가능.
