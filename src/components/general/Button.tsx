interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?:
    | "primary"
    | "secondary"
    | "field"
    | "hyperlink"
    | "hyperlink-navigation";
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  disabled?: boolean;
}

function Button({ children, className, type, onClick, disabled }: ButtonProps) {
  if (type === "hyperlink" || type === "hyperlink-navigation")
    return (
      <button
        className={`font-semibold ${
          type === "hyperlink" && "text-orange-500 hover:text-orange-400"
        } ${
          type === "hyperlink-navigation" && "text-slate-900 text-2xl font-bold"
        } ${className && className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <button
      className={`rounded inline-flex px-5 py-2.5 justify-center items-center gap-2.5 text-md font-semibold ${
        type === "primary" && "bg-orange-500 hover:bg-orange-400 text-white"
      } ${
        type === "secondary" &&
        "text-indigo-600 outline-1 outline-offset-[-1px] outline-indigo-600 hover:bg-gray-50"
      } ${className && className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
