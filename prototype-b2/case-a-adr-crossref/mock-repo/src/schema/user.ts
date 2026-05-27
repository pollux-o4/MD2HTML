// ADR-0003: Zod 스키마 — 런타임 검증 필수
// ADR-0001: strict mode 통과 확인됨
// ADR-0002: ESM 전환 완료
import { z } from "zod";

export const UserCreateSchema = z.object({
  email: z.string().email("올바른 이메일 형식이어야 합니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상"),
  displayName: z.string().min(1).max(40),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "약관 동의가 필요합니다" }),
  }),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserCreateSchema.partial().omit({
  acceptedTerms: true,
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;
