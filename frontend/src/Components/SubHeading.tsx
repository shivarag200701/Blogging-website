import type { ReactNode } from "react";

interface SubHeadingProps {
  children: ReactNode;
}

const SubHeading = ({ children }: SubHeadingProps) => {
  return <div className="text-center text-[#99a1af]">{children}</div>;
};

export default SubHeading;
