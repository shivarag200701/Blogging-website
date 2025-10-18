import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  color: string;
}

const Button = ({ children, onClick, color }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg text-white my-3 sm:p-3 p-2 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default Button;
