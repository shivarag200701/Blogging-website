import { Hono } from "hono";
import { config } from "dotenv";
import router from "./routes/index";
import { PrismaClient } from "./generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: PrismaClient;
  };
}>();
config({ path: ".dev.vars" });

app.use("*", cors());

app.use("*", async (c, next) => {
  const connectionString = c.env.DATABASE_URL;
  const adapter = new PrismaNeon({ connectionString });
  const prisma = global.prisma || new PrismaClient({ adapter });
  c.set("prisma", prisma);

  await next();
});
app.route("/api/v1", router);

export default app;
