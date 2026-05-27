// ADR-0002: ESM 전환 완료
// ADR-0001: strict mode 통과 확인됨
// ADR-0005: 중앙 에러 핸들러 마지막에 등록
// ADR-0003: 환경변수 부팅 시 검증
import express from "express";
import { usersRouter } from "./routes/users.js";
import { errorHandler } from "./middleware/error-handler.js";
import { loadEnv } from "../schema/env.js";

const env = loadEnv();

export const app = express();
app.use(express.json({ limit: "1mb" }));
app.use("/users", usersRouter);

// 반드시 마지막 — ADR-0005
app.use(errorHandler);

app.listen(env.PORT, () => {
  // top-level await 도 가능하지만 listen 콜백으로 두었다 (ADR-0002 의 혜택)
  console.log(`mock-app listening on :${env.PORT}`);
});
