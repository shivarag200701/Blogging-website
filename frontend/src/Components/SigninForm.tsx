import { useState } from "react";
import Heading from "./Heading";
import InputBox from "./InputBox";
import Button from "./Button";

const SignupFrom = () => {
  const [email, setEmail] = useState("");
  const [passoword, setPassword] = useState("");

  async function handleClick() {}
  return (
    <div className="flex items-center justify-center max-w-">
      <div className="flex-col min-w-md">
        <div className="mb-3">
          <Heading>Create an account</Heading>
        </div>
        <div className="flex gap-2 items-center justify-center font-light text-lg text-gray-500 mb-8">
          <p>Don't have an account? </p>
          <a href="/signup" className="underline">
            Sign up
          </a>
        </div>
        <div className="w-full">
          <InputBox
            label="Email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="password"
            value={passoword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} color="black">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupFrom;
