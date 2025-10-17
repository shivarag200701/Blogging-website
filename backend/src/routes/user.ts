import { Hono } from "hono";
import { sign } from "hono/jwt";
import prisma from "../lib/prisma";
import passwordHasher from "../utils/passwordHasher";
import signJWT from "../utils/jwt";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

user.post("/signup", async (c) => {
  const data = await c.req.json();
  const { password, email, name } = data;
  try {
    const hashedPassword = await passwordHasher(password);
    if (!hashedPassword) {
      return c.json(
        {
          msg: "internal server error",
        },
        500
      );
    }
    const res = await prisma.user.create({
      data: {
        email: data["email"],
        name: data["name"],
        password: hashedPassword,
      },
    });

    const token = await signJWT(res.id);

    return c.json(
      {
        msg: "account created succesfully",
        token,
      },
      200
    );
  } catch (err) {
    console.error("error while signup", err);
    c.json(
      {
        msg: "Couldn't save to database,server error",
      },
      500
    );
  }
});

// user.post("/signin", (c) => {});

export default user;
