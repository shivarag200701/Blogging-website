import { useState } from "react";
import Heading from "./Heading";
import InputBox from "./InputBox";
import Button from "./Button";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignupFrom = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const res = await axios.post(
        "https://blogging_website.shivaraghav200701.workers.dev/api/v1/user/signup",
        {
          email,
          password,
          name,
        }
      );
      const token = res.data.token;
      window.localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Axios err", err);
        console.log(err.response?.data.msg);

        setError(err.response?.data.msg);
      } else {
        console.error("general error", err);
      }
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex-col lg:min-w-md">
        <div className="mb-3">
          <Heading>Create an account</Heading>
        </div>
        <div className="flex gap-2 items-center justify-center font-light text-lg text-gray-500 mb-8">
          <p>Already have an account? </p>
          <a href="/signin" className="underline">
            Login
          </a>
        </div>
        <div className="w-full">
          <InputBox
            label="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <InputBox
            label="Email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-red-500">{error}</div>
          <Button onClick={handleClick} color="black">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupFrom;
