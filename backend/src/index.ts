import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { config } from "dotenv";
import prisma from "./lib/prisma";
import router from "./routes/index";

const app = new Hono();
config({ path: ".dev.vars" });

app.route("/api/v1", router);

export default app;
