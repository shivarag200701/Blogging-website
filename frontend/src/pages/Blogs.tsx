import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import BlogCard from "../Components/BlogCard";
const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await axios.get(
          "https://blogging_website.shivaraghav200701.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjZjg0ZGIwLWFmMTktNDcxMC04M2FiLTc1OTkyNDU1MTVhMyJ9.CMqn9FheUOCD31FTa7gqQMH3_HVUmjv9Q_TLcJV6HUc`,
            },
          }
        );
        console.log("blogs", blogs.data);
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
    <div className="flex items-center justify-center p-10">
      <div className="flex-col">
        <BlogCard
          authorName="Shiva"
          publishedDate="Dec 3,2023"
          title="How cloudflare workers work"
          content="Artificial Intelligence is reshaping Software Quality Management by shifting much of the hard stuff away from manual testing and inspection towards smarter, automated and systematic decision-making"
        />
        <BlogCard
          authorName="Shiva"
          publishedDate="Dec 3,2023"
          title="How cloudflare workers work"
          content="Artificial Intelligence is reshaping Software Quality Management by shifting much of the hard stuff away from manual testing and inspection towards smarter, automated and systematic decision-making"
        />
        <BlogCard
          authorName="Shiva"
          publishedDate="Dec 3,2023"
          title="How cloudflare workers work"
          content="Artificial Intelligence is reshaping Software Quality Management by shifting much of the hard stuff away from manual testing and inspection towards smarter, automated and systematic decision-making"
        />
        <BlogCard
          authorName="Shiva"
          publishedDate="Dec 3,2023"
          title="How cloudflare workers work"
          content="Artificial Intelligence is reshaping Software Quality Management by shifting much of the hard stuff away from manual testing and inspection towards smarter, automated and systematic decision-making"
        />
        <BlogCard
          authorName="Shiva"
          publishedDate="Dec 3,2023"
          title="How cloudflare workers work"
          content="Artificial Intelligence is reshaping Software Quality Management by shifting much of the hard stuff away from manual testing and inspection towards smarter, automated and systematic decision-making"
        />
      </div>
    </div>
  );
};

export default Blogs;
