import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-xl font-bold transition flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200",
    outline: "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
