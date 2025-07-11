import type { UseFormRegisterReturn } from "react-hook-form";

interface FieldProps {
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string | number | readonly string[];
  register?: UseFormRegisterReturn;
}

function Field({
  label,
  placeholder,
  type,
  onClick,
  onChange,
  disabled,
  value,
  register,
  ...rest
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label
          htmlFor=""
          className="justify-start text-slate-900 text-sm font-semibold"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        onClick={onClick}
        placeholder={placeholder || "Field"}
        disabled={disabled}
        className="px-5 py-2.5 bg-violet-50 hover:bg-violet-100 rounded inline-flex justify-start items-center gap-2.5 text-slate-900/40 active:text-slate-900 text-md font-normal"
        value={value}
        onChange={onChange}
        {...register}
        {...rest}
      />
    </div>
  );
}

export default Field;
