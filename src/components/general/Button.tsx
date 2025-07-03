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
  formSubmit?: boolean;
}

function Button({
  children,
  className,
  type,
  onClick,
  disabled,
  formSubmit,
}: ButtonProps) {
  if (type === "hyperlink" || type === "hyperlink-navigation")
    return (
      <button
        className={`flex flex-row gap-2 justify-center items-center font-semibold transition duration-150 ${
          type === "hyperlink" &&
          "text-orange-500 hover:text-orange-400 active:text-orange-600"
        } ${
          type === "hyperlink-navigation" &&
          "text-slate-900 hover:text-slate-700 active:text-slate-950 text-2xl font-bold"
        } ${className && className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <button
      className={`rounded inline-flex px-5 py-2.5 justify-center items-center gap-2.5 text-md font-semibold transition duration-150 ${
        type === "primary" &&
        "bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white"
      } ${
        type === "secondary" &&
        "text-indigo-600 outline-1 outline-offset-[-1px] outline-indigo-600 hover:bg-gray-50"
      } ${
        type === "field" &&
        "text-slate-900 bg-violet-50 hover:bg-violet-100 active:bg-violet-200"
      } ${className && className}`}
      onClick={onClick}
      disabled={disabled}
      type={formSubmit && "submit"}
    >
      {children}
    </button>
  );
}

export default Button;
