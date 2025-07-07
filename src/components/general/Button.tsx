import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?:
    | "primary"
    | "secondary"
    | "field"
    | "hyperlink"
    | "hyperlink-navigation";
  formSubmit?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      btnType = "primary",
      onClick,
      disabled,
      formSubmit,
      ...rest
    },
    ref
  ) => {
    if (btnType === "hyperlink" || btnType === "hyperlink-navigation")
      return (
        <button
          ref={ref}
          className={`flex flex-row gap-2 justify-center items-center font-semibold transition duration-150 ${
            btnType === "hyperlink" &&
            "text-orange-500 hover:text-orange-400 active:text-orange-600"
          } ${
            btnType === "hyperlink-navigation" &&
            "text-slate-900 hover:text-slate-700 active:text-slate-950 text-2xl font-bold"
          } ${className ?? ""}`}
          onClick={onClick}
          disabled={disabled}
          {...rest}
        >
          {children}
        </button>
      );

    return (
      <button
        ref={ref}
        className={`rounded inline-flex px-5 py-2.5 justify-center items-center gap-2.5 text-md font-semibold transition duration-150 ${
          btnType === "primary" &&
          "bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white"
        } ${
          btnType === "secondary" &&
          "text-indigo-600 outline-1 outline-offset-[-1px] outline-indigo-600 hover:bg-gray-50"
        } ${
          btnType === "field" &&
          "text-slate-900 bg-violet-50 hover:bg-violet-100 active:bg-violet-200"
        } ${className ?? ""} ${disabled && "disabled:bg-orange-300"}`}
        onClick={onClick}
        disabled={disabled}
        type={formSubmit === "submit" ? "submit" : "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

// Optional for display name in dev tools
Button.displayName = "Button";

export default Button;
