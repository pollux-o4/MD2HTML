// ADR-0002: ESM 전환 완료 — __dirname / __filename 대체 헬퍼
// ADR-0001: strict mode 통과 확인됨
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export function dirnameOf(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}

export function filenameOf(metaUrl: string): string {
  return fileURLToPath(metaUrl);
}
