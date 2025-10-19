import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import BlogCard from "../Components/BlogCard";
import AppBar from "../Components/AppBar";
interface blog {
  author: { name: string };
  authorId: string;
  content: string;
  title: string;
  createdAt: string;
}
const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<blog[]>([]);
  const token = window.localStorage.getItem("token");

  function formatDate(isoDateString: string) {
    const date = new Date(isoDateString);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    } as const;

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(
          "https://blogging_website.shivaraghav200701.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjZjg0ZGIwLWFmMTktNDcxMC04M2FiLTc1OTkyNDU1MTVhMyJ9.CMqn9FheUOCD31FTa7gqQMH3_HVUmjv9Q_TLcJV6HUc`,
            },
          }
        );
        setBlogs(res.data);
        console.log("blogs", res.data);
      } catch (err) {
        if (isAxiosError(err)) {
          console.error("Axios err", err);
          console.log(err.response?.data.msg);
        } else {
          console.error("general error", err);
        }
      }
    }
    fetchBlogs();
  }, [token]);
  return (
    <>
      <AppBar />
      <div className="flex items-center justify-center p-10">
        <div className="flex-col">
          {blogs.map(function (blog) {
            return (
              <BlogCard
                authorName={blog.author.name}
                publishedDate={formatDate(blog.createdAt)}
                title={blog.title}
                content={blog.content}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
