import HeroLabel from "../Components/HeroLabel";
import SignupFrom from "../Components/SignupFrom";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen">
      <SignupFrom />
      <div className="hidden sm:block">
        <HeroLabel />
      </div>
    </div>
  );
};

export default Signup;
