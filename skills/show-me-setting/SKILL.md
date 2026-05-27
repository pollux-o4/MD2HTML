---
name: show-me-setting
description: One-time setup for the show-me skill. Asks a single question (archive path) and writes .show-me.toml. Use when the user runs /show-me-setting.
---

# show-me-setting

`/show-me` skill 의 초기 설정. 질문은 **archive 경로 1개만**.

## 동작

1. 현재 repo root 에 `.show-me.toml` 이 있는지 확인.
2. 사용자에게 한 질문:

   ```
   .agent-output/ 의 archive 경로를 어디에 두시겠어요?
   기본값: .agent-output/show-me/  (Enter 로 확정)
   다른 경로 원하면 입력 (예: ~/notes/show-me/)
   ```

3. 사용자 입력 받기.
4. `.show-me.toml` 생성/업데이트 (atomic write):

   ```toml
   archive_path = "<사용자 응답 또는 기본값>"
   ```

5. 기존 `.show-me.toml` 이 있으면 *기존 archive_path 덮어쓰기 전에 confirm prompt*:

   ```
   기존 archive_path = "<old>". 새 값 "<new>" 으로 덮어쓸까? (y/n)
   ```

6. 완료 보고 1줄.

## 제약

- 질문은 **1개만**. 추가 prompt 없음.
- `.show-me.toml` 의 다른 필드 (`trusted_sources`, `role_patterns`, `enable_cdn_libs` 등) 는 사용자가 직접 편집. 이 setting 명령은 archive 경로만.
- atomic write (temp → rename).
- 기본 gitignored (자동 추가 처리는 `/show-me` 의 책임).
