import { useEffect } from "react";
import axios from "axios";
import type { SignupType } from "@shiva200701/common-app";

function UseSignup({ email, password, name }: SignupType) {
  useEffect(() => {
    async function signUp() {
      const res = axios.post(
        "https://blogging_website.shivaraghav200701.workers.dev//api/v1/user/signup",
        {
          email,
          password,
          name,
        }
      );
      console.log(res);
    }
    signUp();
  }, [email, password, name]);
}

export default UseSignup;
