// ADR-0005: 구조화 로그 (pino) — requestId / errorCode 자동 포함
// ADR-0002: ESM 전환 완료
// ADR-0001: strict mode 통과 확인됨
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: "mock-app" },
  timestamp: pino.stdTimeFunctions.isoTime,
});
