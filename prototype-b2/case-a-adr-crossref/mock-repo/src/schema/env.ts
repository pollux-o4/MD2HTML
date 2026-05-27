// ADR-0003: Zod 스키마 — 런타임 검증 필수 (환경변수도 부팅 시 parse)
// ADR-0001: strict mode 통과 확인됨
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET 은 최소 32자"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  // 부팅 시점에 즉시 실패시키기 — 환경변수 누락은 컴파일 에러처럼 다룬다
  return EnvSchema.parse(process.env);
}
