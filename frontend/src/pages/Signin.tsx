import SigninForm from "../Components/SigninForm";
import HeroLabel from "../Components/HeroLabel";

const Signin = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <SigninForm />
      <HeroLabel />
    </div>
  );
};

export default Signin;
