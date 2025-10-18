import HeroLabel from "../Components/HeroLabel";
import SignupFrom from "../Components/SignupFrom";

const Signup = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <SignupFrom />
      <HeroLabel />
    </div>
  );
};

export default Signup;
