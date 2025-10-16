import { Hono } from "hono";
import { sign } from "hono/jwt";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
user.get("/", (c) => {
  return c.json(c.env.DATABASE_URL);
});
user.post("/signup", (c) => {
  console.log(c.env.JWT_SECRET);
  return c.json({
    jwt: c.env.JWT_SECRET,
  });
});

// user.post("/signin", (c) => {

// });

export default user;
