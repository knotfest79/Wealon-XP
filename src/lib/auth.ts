import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_NAME = "token";

function getJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return JWT_SECRET;
}

export function signToken(payload: any) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
}

export function getAuthCookieName() {
  return TOKEN_NAME;
}
