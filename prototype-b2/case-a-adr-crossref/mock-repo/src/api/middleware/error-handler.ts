// ADR-0005: 중앙 에러 핸들러 — 모든 라우트 에러는 여기를 거친다
// ADR-0003: ZodError → ValidationError 변환 규칙 적용
// ADR-0001: strict mode 통과 확인됨
// ADR-0002: ESM 전환 완료
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError, ValidationError } from "../../utils/errors.js";
import { logger } from "../../utils/logger.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const requestId = (req as Request & { id?: string }).id ?? "unknown";

  let appErr: AppError;
  if (err instanceof AppError) {
    appErr = err;
  } else if (err instanceof ZodError) {
    appErr = new ValidationError(
      "요청 데이터가 올바르지 않습니다",
      err.format(),
    );
  } else {
    appErr = new AppError({
      code: "INTERNAL",
      httpStatus: 500,
      userMessage: "서버 내부 오류가 발생했습니다",
      cause: err,
    });
  }

  logger.error(
    {
      requestId,
      errorCode: appErr.code,
      httpStatus: appErr.httpStatus,
      cause: appErr.cause,
    },
    appErr.message,
  );

  const isProduction = process.env.NODE_ENV === "production";
  res.status(appErr.httpStatus).json({
    error: {
      code: appErr.code,
      message: appErr.userMessage,
      ...(isProduction ? {} : { detail: appErr.cause }),
    },
  });
}

// asyncHandler — async 라우트의 throw 를 next() 로 전파
export function asyncHandler<T extends Request, U extends Response>(
  fn: (req: T, res: U, next: NextFunction) => Promise<unknown>,
) {
  return (req: T, res: U, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}
