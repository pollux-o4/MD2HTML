// ADR-0003: Zod 스키마 — 런타임 검증 필수
// ADR-0005: 중앙 에러 핸들러 사용 — try/catch 직접 금지
// ADR-0001: strict mode 통과 확인됨
// ADR-0002: ESM 전환 완료
import { Router } from "express";
import { UserCreateSchema } from "../../schema/user.js";
import { asyncHandler } from "../middleware/error-handler.js";
import { ConflictError, NotFoundError } from "../../utils/errors.js";
import { createUser, findUserById } from "../../auth/user-service.js";

export const usersRouter = Router();

usersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    // ADR-0003: 수동 검증 50줄 → Zod parse 1줄
    const input = UserCreateSchema.parse(req.body);

    const existing = await findUserById(input.email);
    if (existing) {
      // ADR-0005: throw 만 하면 중앙 핸들러가 처리
      throw new ConflictError("이미 가입된 이메일입니다");
    }

    const user = await createUser(input);
    res.status(201).json({ user });
  }),
);

usersRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) throw new NotFoundError("사용자");
    res.json({ user });
  }),
);
