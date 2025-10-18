import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "../generated/prisma";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: PrismaClient;
  };
}>();

blog.use("/*", async (c, next) => {
  const prisma = c.var.prisma;
  const authorization = c.req.header("Authorization");

  if (!authorization) {
    return c.json({ msg: "No Authorization token found" });
  }
  const token = authorization?.split(" ")[1];

  try {
    const userId = await verify(token, c.env.JWT_SECRET);
    c.set("userId", JSON.stringify(userId.id));

    await next();
  } catch (err) {
    console.error("error while decoding jwt", err);

    return c.json(
      {
        msg: "Invalid json token not authenticated",
      },
      411
    );
  }
});

blog.post("/", async (c) => {
  const prisma = c.var.prisma;
  const { title, content } = await c.req.json();
  const raw = c.get("userId");
  const userId = String(raw).trim().replace(/^"|"$/g, "");

  try {
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    console.log(blog);

    return c.json(
      {
        msg: "blog succesgully created",
      },
      200
    );
  } catch (err) {
    console.error("error in blog creation", err);
    return c.json(
      {
        msg: "Internal Server error",
      },
      500
    );
  }
});

blog.put("/", async (c) => {
  const prisma = c.var.prisma;
  const { title, content, id } = await c.req.json();
  const raw = c.get("userId");
  const userId = String(raw).trim().replace(/^"|"$/g, "");

  try {
    const blog = await prisma.post.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        title,
        content,
      },
    });
    console.log();

    return c.json(
      {
        msg: "blog updated successfull",
      },
      200
    );
  } catch (err) {
    console.error("error in blog updation", err);
    return c.json(
      {
        msg: "Internal Server error",
      },
      500
    );
  }
});

blog.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.var.prisma;
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return c.json(
        {
          msg: "Blog not found",
        },
        411
      );
    }

    return c.json(blog, 200);
  } catch (err) {
    console.error("Error grtting the blog", err);
    return c.json(
      {
        msg: "Internal server error",
      },
      500
    );
  }
});
blog.get("/bulk", async (c) => {
  const prisma = c.var.prisma;
  const raw = c.get("userId");
  const userId = String(raw).trim().replace(/^"|"$/g, "");
  console.log(userId);

  try {
    const blogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    console.log(blogs);

    if (!blogs) {
      return c.json({
        msg: "No blogs",
      });
    }

    return c.json(blogs);
  } catch (err) {
    console.error("notable to get blogs", err);
    return c.json(
      {
        msg: "Internal Server error",
      },
      500
    );
  }
});

export default blog;
