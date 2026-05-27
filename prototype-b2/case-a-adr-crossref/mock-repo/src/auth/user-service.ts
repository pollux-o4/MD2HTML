// ADR-0001: strict mode 통과 확인됨
// ADR-0002: ESM 전환 완료
// ADR-0003: Zod 타입 (UserCreate) single source of truth
import type { UserCreate } from "../schema/user.js";
import { AuthError } from "../utils/errors.js";

type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
};

const _users = new Map<string, User>();

export async function createUser(input: UserCreate): Promise<User> {
  const user: User = {
    id: crypto.randomUUID(),
    email: input.email,
    displayName: input.displayName,
    createdAt: new Date(),
  };
  _users.set(user.id, user);
  return user;
}

export async function findUserById(id: string): Promise<User | null> {
  return _users.get(id) ?? null;
}

export async function authenticate(
  email: string,
  password: string,
): Promise<User> {
  // ADR-0005: 도메인 에러는 AppError 서브클래스로
  if (!email || !password) {
    throw new AuthError("이메일과 비밀번호가 필요합니다");
  }
  for (const u of _users.values()) {
    if (u.email === email) return u;
  }
  throw new AuthError();
}
