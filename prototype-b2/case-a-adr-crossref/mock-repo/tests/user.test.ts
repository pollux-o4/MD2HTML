// ADR-0004: Vitest 마이그레이션 완료 — 이전엔 jest.mock, 지금은 vi.mock
// ADR-0003: 스키마 단위 테스트
// ADR-0001: strict mode 통과 확인됨
import { describe, it, expect, vi } from "vitest";
import { UserCreateSchema } from "../src/schema/user.js";

describe("UserCreateSchema", () => {
  it("유효 입력은 통과", () => {
    const ok = UserCreateSchema.safeParse({
      email: "a@b.com",
      password: "12345678",
      displayName: "Hong",
      acceptedTerms: true,
    });
    expect(ok.success).toBe(true);
  });

  it("약관 동의 누락은 실패", () => {
    const r = UserCreateSchema.safeParse({
      email: "a@b.com",
      password: "12345678",
      displayName: "Hong",
      acceptedTerms: false,
    });
    expect(r.success).toBe(false);
  });
});

describe("vi mock smoke", () => {
  it("vi 가 jest 대신 import 된다", () => {
    expect(vi).toBeDefined();
  });
});
