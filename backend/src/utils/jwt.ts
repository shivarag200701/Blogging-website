import { sign } from "hono/jwt";

async function signJWT(id: string) {
  try {
    const payload = { id };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = await sign(payload, secret);
    return token;
  } catch (err) {
    throw new Error("error while jwt sigining");
  }
}

export default signJWT;
