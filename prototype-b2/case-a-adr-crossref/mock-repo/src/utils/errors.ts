// ADR-0005: 중앙 에러 핸들러 사용 — 라우트에서 try/catch + res.status 직접 호출 금지
// ADR-0001: strict mode 통과 확인됨
// ADR-0002: ESM 전환 완료

export type ErrorCode =
  | "VALIDATION_FAILED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: number;
  public readonly userMessage: string;
  public override readonly cause?: unknown;

  constructor(opts: {
    code: ErrorCode;
    httpStatus: number;
    userMessage: string;
    cause?: unknown;
  }) {
    super(opts.userMessage);
    this.name = "AppError";
    this.code = opts.code;
    this.httpStatus = opts.httpStatus;
    this.userMessage = opts.userMessage;
    this.cause = opts.cause;
  }
}

export class ValidationError extends AppError {
  constructor(userMessage: string, cause?: unknown) {
    super({ code: "VALIDATION_FAILED", httpStatus: 400, userMessage, cause });
    this.name = "ValidationError";
  }
}

export class AuthError extends AppError {
  constructor(userMessage = "인증이 필요합니다") {
    super({ code: "UNAUTHORIZED", httpStatus: 401, userMessage });
    this.name = "AuthError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super({
      code: "NOT_FOUND",
      httpStatus: 404,
      userMessage: `${resource} 를 찾을 수 없습니다`,
    });
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(userMessage: string) {
    super({ code: "CONFLICT", httpStatus: 409, userMessage });
    this.name = "ConflictError";
  }
}
