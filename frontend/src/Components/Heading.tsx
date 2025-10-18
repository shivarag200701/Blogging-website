import { type ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}
const Heading = ({ children }: HeadingProps) => {
  return <div className="text-4xl font-bold text-center">{children}</div>;
};

export default Heading;
