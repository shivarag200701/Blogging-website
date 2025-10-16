import { Hono } from "hono";

const blog = new Hono();

blog.post("/", (c) => {
  return c.text("from blog post");
});

blog.put("/", (c) => {
  return c.text("from blog put");
});

blog.get("/:id", (c) => {});
blog.get("/bulk", (c) => {});

export default blog;
