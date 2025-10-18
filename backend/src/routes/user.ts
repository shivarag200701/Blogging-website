import { Hono } from "hono";
import passwordHasher from "../utils/passwordHasher";
import verifyPassword from "../utils/verifyPassword";
import signJWT from "../utils/jwt";
import { PrismaClient } from "../generated/prisma";
import { signinSchema, signupSchema } from "@shiva200701/common-app";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: PrismaClient;
  };
}>();

user.post("/signup", async (c) => {
  console.log("hi");
  const prisma = c.var.prisma;
  const body = await c.req.json();
  const { success, data, error } = signupSchema.safeParse(body);

  if (!success) {
    return c.json({ msg: "send proper data", error }, 411);
  }
  const { password, email, name } = data;
  try {
    const hashResult = await passwordHasher(password);
    if (!hashResult) {
      console.error("not able to hash passsword");

      return c.json(
        {
          msg: "Internal Servererror",
        },
        200
      );
    }

    const { hashedPassword, salt } = hashResult;

    const exisitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exisitingUser) {
      console.error("User with email already exists");
      return c.json(
        {
          msg: "User already exisits",
        },
        409
      );
    }

    const res = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        salt,
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
    return c.json(
      {
        msg: "Couldn't save to database,server error",
      },
      500
    );
  }
});

user.post("/signin", async (c) => {
  const prisma = c.var.prisma;
  const body = await c.req.json();
  const { data, error, success } = signinSchema.safeParse(body);

  if (!success) {
    return c.json({ msg: "send proper data", error }, 411);
  }
  const { email, password } = data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return c.json({ msg: "email does not exist" }, 401);
    }
    const passwordCheck = await verifyPassword(
      password,
      user.password,
      user.salt
    );
    if (!passwordCheck) {
      console.log("wrong password");

      return c.json({ msg: "incorrect password" }, 401);
    }

    const token = await signJWT(user.id);

    return c.json(
      {
        msg: "logged in sucessfully",
        token,
      },
      200
    );
  } catch (err) {
    console.error("error while signin", err);
    c.json(
      {
        msg: "Internal Server error",
      },
      500
    );
  }
});

export default user;
