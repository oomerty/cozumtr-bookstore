interface ButtonProps {
  children: React.ReactNode;
  type?:
    | "primary"
    | "secondary"
    | "field"
    | "hyperlink"
    | "hyperlink-navigation";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ children, type, onClick, disabled }: ButtonProps) {
  if (type === "hyperlink" || type === "hyperlink-navigation")
    return (
      <button
        className={`font-semibold ${type === "hyperlink" && "text-orange-500"}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <button
      className={`rounded inline-flex px-5 py-2.5 justify-center items-center gap-2.5 text-md font-semibold ${
        type === "primary" && "bg-orange-500 text-white"
      } ${
        type === "secondary" &&
        "text-indigo-600 outline outline-1 outline-offset-[-1px] outline-indigo-600"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
