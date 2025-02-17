"use client";

interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  label?: string;
  className?: string;
}

const Button = ({ onClick, label, className }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`text-very-light-green font-medium p-[10px] bg-navy-blue border-none rounded-md ${className || ''}`.trim()}
    >
      {label}
    </button>
  );
};

export default Button;