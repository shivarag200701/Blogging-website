import { Hono } from "hono";
import user from "./user";
import blog from "./blog";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

router.route("/user", user);
router.route("/blog", blog);

export default router;
