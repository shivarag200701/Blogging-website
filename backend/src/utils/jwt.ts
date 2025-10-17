import { sign } from "hono/jwt";

async function signJWT(id: string) {
  const payload = { id };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = await sign(payload, secret);
  return token;
}

export default signJWT;
