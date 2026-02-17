# Notification & Social Runbook

## 목표
- `data/items.json` 업데이트 시 신규 항목을 자동 감지합니다.
- X 게시를 조건부 자동화합니다.
- 게시 실패 시 수동 포스팅용 초안(`social-draft.md`)을 항상 남깁니다.

## 워크플로우
- 파일: `.github/workflows/notify.yml`
- 트리거:
  - `push` (`main`, `data/items.json` 변경 포함)
  - `pull_request` (검증용)
  - `workflow_dispatch` (수동 실행, `dry_run` 선택)

## 필수 스위치 (GitHub Variables)
- `ENABLE_X_POST`: `true` / `false`

기본 권장: PR/초기 운영에서는 `false`, 검증 후 `true`로 전환.

## 선택 변수 (안정화 권장)
- `X_POST_COOLDOWN_SECONDS`: 최근 notify 실행 직후 재포스팅 방지를 위한 대기 시간(초). 기본 `180`.
- `X_DEGRADE_REPLY_403_429`: `true`/`false` (기본 `true`)
  - `true`: reply가 403/429로 막히면 main tweet은 유지하고 **degraded(main_only)** 처리
  - `false`: 기존처럼 reply 실패 시 전체 롤백
- `X_SAFE_LIMIT`: X 글자수 안전 상한(기본 `275`, 최대 `280`)

## AI 카피 생성(선택)
- `ENABLE_AI_X_COPY`: `true`/`false` (기본 `false`)
  - `true`면 OpenAI 모델로 main/reply 초안을 생성하고, 길이 검증 실패 시 재시도 후 규칙 기반으로 자동 fallback
- `OPENAI_MODEL`: 공통 모델 (미설정 시 기본 후보 자동 사용)
- `OPENAI_MODEL_MAIN`: 메인 포스트 전용 모델 (선택)
- `OPENAI_MODEL_REPLY`: reply 전용 모델 (선택)
- `OPENAI_API_BASE`: 기본 `https://api.openai.com/v1` (대부분 미설정)
- `OPENAI_X_DEBUG`: `true`면 프롬프트/입출력 디버그를 `artifacts/openai-x-copy-debug.json`으로 저장

필수 시크릿:
- `OPENAI_API_KEY`

> 추천 세팅
> - `ENABLE_AI_X_COPY=true`
> - `OPENAI_MODEL=gpt-4.1-mini` (또는 원하는 모델)
> - `X_SAFE_LIMIT=275`

## 필수 시크릿 (GitHub Secrets)

### X (OAuth 1.0a)
- `X_API_KEY` (Consumer Key)
- `X_API_SECRET` (Consumer Secret)
- `X_ACCESS_TOKEN`
- `X_ACCESS_TOKEN_SECRET`
- (선택) `X_API_BASE` variable (기본: `https://api.x.com`)

## 테스트 절차 (권장)
1. 브랜치/PR에서 `pull_request` 워크플로우 확인 (digest 생성/아티팩트 확인)
2. `workflow_dispatch`로 `dry_run=true` 실행
3. 테스트 계정 토큰 설정 후 `workflow_dispatch` + `dry_run=false`로 1회 게시 검증
4. 문제 없으면 `ENABLE_X_POST`를 `true`로 전환

## 실패 시 운영
- Actions `notify-artifacts`에서 `social-draft.md` 다운로드
- X에 수동으로 복사 게시
- 에러코드(권한/토큰/레이트리밋) 확인 후 토큰 재발급
- `post_x` Job Summary에서 `failurePhase`, `httpStatus`, `errorCode`, `attempts`, `rollbackDeleted` 확인

## 운영 정책 (현재 기본)
- 목표는 스레드 완전성보다 **신규 업데이트 전달 안정성**입니다.
- reply가 403/429로 차단되면 main tweet을 우선 유지합니다(`degradedMode=main_only`).
- `workflow_dispatch` 테스트 실행 시에는 트윗 끝에 테스트 suffix가 자동으로 붙어 중복 차단 가능성을 낮춥니다.
