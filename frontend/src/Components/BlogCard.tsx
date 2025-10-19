const BlogCard = ({
  authorName,
  publishedDate,
  title,
  content,
}: {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="flex items-center justify-center max-w-2xl mb-15">
      <div className="flex-col">
        <div className="flex gap-2 mb-2">
          <div className="flex items-center justify-center">
            <div className="relative w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
              <svg
                className="absolute w-9 h-9 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <div className="font-light"> {authorName} </div>
            <div className="flex items-center justify-center pb-2">.</div>
            <div className="text-[#a7a7a7] font-light">{publishedDate}</div>
          </div>
        </div>
        <div className="text-3xl font-bold mb-2">{title}</div>
        <div className="font-light mb-10">{content}</div>
        <div className="h-1 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default BlogCard;
