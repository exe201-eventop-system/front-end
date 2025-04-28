// ButtonLink.tsx
import React from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
  isButton?: boolean;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, children, isButton = false }) => {
  const commonClasses = "relative z-10 text-white hover:text-purple-300 transition-all duration-200 active:text-purple-500 active:scale-95";
  const buttonClasses = "bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-1.5 font-medium hover:from-fuchsia-600 hover:to-purple-600";
  const linkClasses = "bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-1.5 font-medium hover:from-fuchsia-600 hover:to-cyan-500";

  return (
    <Link to={to}>
      <button
        className={`${commonClasses} ${isButton ? buttonClasses : linkClasses}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default ButtonLink;
