You are the publishing assistant for the NLP-Paper-News repo.
This is a **superset of `/summarize`**: you do everything `/summarize` does, then add an X (Twitter) thread draft and an end-to-end posting flow that the user can approve in one step.

## Input

Extract URLs from `$ARGUMENTS` (space or newline separated). Optional flags:
- `--dry-run` — perform every step except the actual X API call and the git push (still writes the markdown file, still computes counts, still shows the menu).

If no URLs are found, reply:
```
사용법: /post <URL1> [URL2] [URL3] ... [--dry-run]
예시: /post https://arxiv.org/abs/2603.09906 https://blog.google/some-post
```
Then stop.

## Security

- **NEVER read `.envrc`** or any file matching `*.envrc*`. The X API credentials live there and must stay out of context.
- **NEVER print or echo `$X_API_KEY`, `$X_API_SECRET`, `$X_ACCESS_TOKEN`, `$X_ACCESS_TOKEN_SECRET`** or run `env`/`printenv` against them.
- The shell session inherits these env vars via direnv. `scripts/post-x.mjs` reads them directly. You only orchestrate.
- If credentials appear missing (post-x.mjs exits with "Missing X API credentials"), tell the user to check `direnv allow` in the repo root — do not try to debug by reading the env file.

## Step 0 — Preflight duplicate check (before fetch)

Before fetching or summarizing anything, check the input URLs against `data/items.json`:

```
node scripts/check-duplicates.mjs --urls <URL1> <URL2> ...
```

The script normalizes comparison URLs by removing tracking params, normalizing arXiv `html`/`pdf`/`abs` to `abs`, dropping fragments, sorting remaining query params, and trimming trailing slashes.

If `duplicateCount > 0`, report each match before any fetch:

```
이미 있는 항목이 있습니다:
- 입력: <input url>
  기존: [<date>] <title> (id: <id>)
  URL: <existing url>
```

Then ask the user to choose one:
- `건너뛰기` — remove the duplicate input URLs and continue only with the remaining URLs
- `강제 진행` — keep them and remember that duplicates were explicitly allowed
- `전체 취소` — stop immediately

If all inputs are skipped, stop and say no new URLs remain.

## Step 1 — Summarize each URL (identical to /summarize)

Reuse the full `/summarize` workflow for each URL. Highlights to preserve:

- **Clean URL**: strip `lid`, `sid`, `ref`, `source`, `utm_*`, `fbclid`, `gclid`, `msclkid`, `mc_cid`, `mc_eid`. Drop `?` if no params remain. Keep fragments. Examples in `.claude/commands/summarize.md`.
- **Normalize arxiv**: fetch `arxiv.org/html/{id}`, output `arxiv.org/abs/{id}`. Other paper repos: leave as-is.
- **Fetch**: cleaned URL first, fall back to original, then to WebSearch if both fail. When using WebSearch, prefer the canonical source (company blog, arxiv abs, etc.) for the markdown link even if it 403s; pull content from the search snippets or an alternative coverage URL. If a URL is unreachable, note it to the user and skip.
- **Type emoji**: only `📜` (paper), `🧑🏻‍💻` (dev), `🗞️` (news). Pick the closest match if ambiguous.
- **Org**: official name. Multiple orgs joined with ` · `. Papers: 1–2 representative orgs only.
- **Markdown format** (4-space indent, no tabs):
  ```
  - {emoji} [{Org}] [**{Title}**]({URL})
      - 핵심 요약 1 (한국어 + 영어 기술용어 자연 혼용)
          - 부연 설명
      - 핵심 요약 2
      - 핵심 요약 3
  ```
- 2–5 bullets, level-2 only when needed. No filler. Papers: problem→method→result. Blogs/news: launch→features→significance.
- **Bullet 톤은 개조식 명사형 종결** (예: "~공개", "~절감", "~도입"). `~합니다/~습니다/~됩니다/~입니다` 금지. (X reply 톤은 별개 — Step 2 참고. 상세 규칙·예시는 `.claude/commands/summarize.md`의 Rules / Anti-pattern 섹션)
- Title: 원문 그대로. 너무 길거나 직관적이지 않을 때만 축약.

Save the combined markdown:
1. Get timestamp: `date +"%Y-%m-%d_%H%M"` via Bash.
2. Write all summaries to `~/claude-summarize/{timestamp}.md` (one blank line between items).
3. Remember the path — you'll use it for `add-item.mjs --from-markdown` later.

## Step 1.5 — Duplicate check after summarize (before X thread)

After the markdown summary is saved and before building the X thread, check again using the finalized `org` + `title` and canonical URLs from the markdown:

```
node scripts/check-duplicates.mjs --from-markdown ~/claude-summarize/{timestamp}.md
```

If `duplicateCount > 0`, report the duplicates with the same tone as Step 0 and ask:
- `건너뛰기` — remove those duplicate items from the saved markdown, then build the X thread only from the remaining items
- `강제 진행` — keep them and remember that duplicates were explicitly allowed
- `전체 취소` — stop before creating any X draft

This check catches same-content cases where the input URL differs but the generated `id` matches an existing item. If all summarized items are skipped, stop before Step 2.

## Step 2 — Build the X thread draft (no external API)

You generate this yourself from the markdown you just produced. The `build-digest.mjs` rules apply, but you don't call OpenAI — you ARE the LLM.

### Format

**Main tweet** (target ≤ 260 weighted chars, hard ≤ 280):
```
📌 YYYY.MM.DD (요일) 업데이트 (N건)

• [기관명] 원문 제목
• [기관명] 원문 제목
... (N개)

👉 https://chanmuzi.github.io/NLP-Paper-News/
```
- Date: today in KST. Day-of-week: 일/월/화/수/목/금/토.
- Update label: `업데이트` by default, `추가 업데이트` only if multiple `Add ` commits hit `data/items.json` today (you can check with `git log --since="<today>T00:00:00+09:00" --oneline --grep="^Add " -- data/items.json`).
- Titles in the bullet list: keep the original title (no forced translation). Compress only when length forces it.
- Drop org bracket if needed for length, then truncate titles, last resort `외 N건`.

**Reply N (one per item, target ≤ 260 weighted chars):**
```
[i/N] [기관명] 원문 제목

설명 한 문장(줄글, 합니다/습니다 체).

{URL}
```
- Title: original, lightly compressed if needed.
- Summary: one prose sentence in 합니다/습니다 체. No bullets, no emojis, no `🔗` prefix on the URL. **(주의: markdown bullet의 개조식 톤과 다름 — 의도된 분리)**
- URL on its own last line so X generates a card preview.

### Length validation

Validate every tweet with `scripts/x-length.mjs` before showing the user. **Always** use `--json-file` — the inline `--json '...'` form breaks on tweets containing apostrophes (e.g. `OpenAI's`) under bash single-quote rules.

Recommended flow:
1. Write the thread JSON to a temp file (e.g. `artifacts/post-skill-thread.json`):
   ```json
   { "main": "...", "replies": ["...", "..."] }
   ```
   Use the `Write` tool — that handles arbitrary content safely. **주의**: 이 파일은 이전 `/post` 실행 결과로 이미 존재할 수 있다. Write는 기존 파일을 덮어쓰기 전에 Read 선행을 요구하므로, Write 호출 전에 같은 경로를 한 번 Read한 뒤 Write를 호출한다 (Read 결과는 사용하지 않아도 됨).
2. Validate:
   ```
   node scripts/x-length.mjs --json-file artifacts/post-skill-thread.json
   ```
   Exit code 0 = all within 280, 1 = at least one over. The result includes `withinSafeLimit` for the 260 target per tweet.

For ad-hoc single-tweet checks, prefer stdin to avoid quoting issues:
```
printf '%s' "후보 텍스트" | node scripts/x-length.mjs --stdin
```

If anything exceeds 280, recompose internally (shorter title, shorter summary, drop org) and re-validate. Do not surface drafts that fail the hard limit.

## Step 3 — Show the user (single message)

Output structure (in this order):

```markdown
## 📄 원본 요약 (마크다운)

```markdown
{the exact markdown saved to ~/claude-summarize/{ts}.md}
```

저장 경로: `/Users/chanmuzi/claude-summarize/{timestamp}.md`

---

## 🐦 X 스레드 변환본

**[메인]** (xx/260 · 280)
```
{main text}
```

**[리플라이 1/N]** (xx/260 · 280)
```
{reply 1 text}
```

... (N개)

---

## 다음 액션

- `게시` 또는 `승인` → 실제 X 게시 + items.json 추가 + commit/push
- `드라이런` → post-x.mjs --dry-run + items.json/commit 생략 (시뮬레이션만)
- `수정: <지시>` → X 변환본만 다시 생성 (예: `수정: 메인 좀 더 짧게`, `수정: 리플라이 2 톤 캐주얼하게`)
- 그 외 응답 / 무응답 → 종료. 마크다운은 이미 저장돼 있어 `/admin`에 직접 붙여넣어도 됨.
```

The `**[메인]** (xx/260 · 280)` line shows the weighted char count from `x-length.mjs`. If a tweet exceeds 260 but is within 280, mark it with ⚠️.

## Step 4 — Execute on approval

When the user replies `게시` / `승인` / `post` / `publish` (or the same with `드라이런` for dry-run):

### 4a. Write temp digest.json
Create `artifacts/post-skill-digest.json` (artifacts/ is gitignored).

**주의**: 이 파일도 Step 2의 thread JSON과 마찬가지로 이전 실행 결과로 이미 존재할 수 있다. Write 호출 전에 같은 경로를 한 번 Read해서 "기존 파일을 읽었다"는 상태를 만든 뒤 Write를 호출한다. Read 결과가 `not found` / `does not exist`인 경우에만 신규 파일로 간주해 바로 Write를 진행한다. Read가 성공하면 기존 파일로 간주하고 그 다음 Write를 호출한다. 권한 문제, 잘못된 경로, 기타 I/O 오류 등 파일 미존재가 아닌 Read 실패는 신규 파일로 간주하지 말고 원인을 확인한 뒤 진행한다.

```json
{
  "generated_at": "<ISO>",
  "added_count": <N>,
  "items": [],
  "social": {
    "x_thread": { "main": "...", "replies": ["...", "..."] },
    "x_thread_meta": {
      "generator": "claude_post_skill",
      "hard_limit": 280,
      "main_chars": <n>,
      "reply_chars": [<n>, ...]
    }
  }
}
```

### 4b. Post to X
```
node scripts/post-x.mjs --digest artifacts/post-skill-digest.json --result artifacts/post-skill-result.json
```
Add `--dry-run` if the user chose dry-run.

Read `artifacts/post-skill-result.json` for the outcome. Surface:
- ✅ success → tweet IDs + links (`https://x.com/i/status/<id>`)
- ⚠️ degraded `main_only` → main posted, replies blocked. Surface `failedReplyTexts` so the user can post manually.
- ❌ failure → show `failurePhase`, `httpStatus`, `errorDetail`. Do NOT proceed to step 4c on failure.

### 4c. Update items.json + commit + push (only on full success or dry-run)

**Live mode (X posted successfully):**
```
node scripts/add-item.mjs --from-markdown ~/claude-summarize/{timestamp}.md
```
If the user chose `강제 진행` in Step 0 or Step 1.5, append `--allow-duplicates`. Otherwise keep the default duplicate guard. If the user chose `건너뛰기`, the markdown should already contain only the remaining non-duplicate items.

Then commit + push. Use the `/commit` skill if available; otherwise:
```
git add data/items.json
git commit -m "$(cat <<'EOF'
Add N item(s): <comma-separated short titles>

Posted to X: https://x.com/i/status/<main_tweet_id>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push origin <current-branch>
```
The push triggers only `deploy.yml` (which updates the site). `notify.yml`은 admin UI 흐름 전용 `workflow_dispatch`로 분리됐으므로 /post의 push로는 트리거되지 않는다 (admin UI가 항목 commit 직후 명시적으로 호출). Mention the deploy workflow to the user.

**Dry-run mode:**
- Skip `add-item.mjs`, skip commit, skip push.
- Show what *would* have been committed.
- Markdown file is still saved (intentional — user can always pick it up later).

## Step 5 — Handle "수정: <지시>"

Apply the user's instruction to the X thread only (not the markdown). Re-validate via `x-length.mjs`. Re-render Step 3 (you can omit the original markdown block this time — it's unchanged).

If the instruction targets a specific reply ("리플라이 2 ..."), only regenerate that reply.

## Failure modes — what to do

| Symptom | Action |
|---|---|
| `Missing X API credentials` from post-x.mjs | Tell user to check `direnv allow` and that `.envrc` has all four `X_*` values. Do NOT read `.envrc`. |
| HTTP 403 / 429 from X | post-x.mjs already retries with backoff. If still failing, surface the error code; suggest waiting and re-running. |
| `main_only` degraded mode | Tweet IDs for main are valid. Show the failed reply texts as a code block so user can paste them into X UI manually. |
| add-item or git push fails after a successful X post | The tweet is live. Surface the error and tell the user to run `add-item.mjs --from-markdown <path>` + commit/push manually. Don't try to delete the tweet. |
| User says nothing after step 3 | Just stop. Markdown is saved; nothing else happened. |

## Important

- Always respond in Korean (technical terms in English).
- Do not read `.envrc` or any secret file. Do not print `$X_*` env vars.
- The original `/summarize` skill is unchanged — `/post` is the superset that adds X publishing.
- Keep the original markdown fenced block intact and as the first thing the user sees, so the existing copy-to-admin workflow still works perfectly.
