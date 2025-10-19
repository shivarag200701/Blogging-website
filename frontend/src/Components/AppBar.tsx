import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/create_blog");
  }
  return (
    <div>
      <div className="flex justify-between px-10 py-4">
        <div className="flex gap-4">
          <div className="flex justify-center items-center font-bold text-xl">
            Medium
          </div>
          <div className="flex justify-center items-center">
            <img
              src="../../public/medium.png"
              alt="medium"
              className="h-10 w-10"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <button
            className="bg-[#1a8b16] rounded-3xl p-2 text-gray-300 cursor-pointer hover:shadow-xl"
            onClick={handleClick}
          >
            Create Blog
          </button>
          <div className="flex justify-center items-center">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hidden sm:block">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
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
        </div>
      </div>
    </div>
  );
};

export default AppBar;
