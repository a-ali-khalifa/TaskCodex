type ButtonProps = {
  label: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "tertiary";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  label,
  onClick,
  color = "primary",
  variant = "solid",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "font-rubik font-medium rounded-xl transition-all duration-200 active:scale-95";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const colorStyles = {
    solid: {
      primary:
        "bg-primary text-white hover:bg-[#2f4fcc] shadow-lg shadow-primary/25",
      secondary:
        "bg-secondary text-white hover:bg-[#3a4250] shadow-lg shadow-secondary/25",
      tertiary:
        "bg-tertiary text-white hover:bg-[#3a4250] shadow-lg shadow-tertiary/25",
      // success:
      //   "bg-success text-white hover:bg-[#028a1b] shadow-lg shadow-success/25",
      // danger:
      //   "bg-danger text-white hover:bg-[#7f1d1d] shadow-lg shadow-danger/25",
    },
    outline: {
      primary:
        "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
      secondary:
        "bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-white",
      tertiary:
        "bg-tertiary text-white hover:bg-[#3a4250] shadow-lg shadow-tertiary/25",
    },
    ghost: {
      primary: "bg-transparent text-primary hover:bg-primary/10",
      secondary: "bg-transparent text-secondary hover:bg-secondary/10",
      tertiary:
        "bg-tertiary text-white hover:bg-[#3a4250] shadow-lg shadow-tertiary/25",
    },
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:scale-100";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${
        colorStyles[variant][color]
      } ${disabled ?? disabledStyles} ${className}`}
    >
      {label}
    </button>
  );
};
