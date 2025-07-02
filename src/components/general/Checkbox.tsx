interface CheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Checkbox({ id, label, disabled, onClick }: CheckboxProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={id}
        className="appearance-none w-4 h-4 border-3 border-indigo-600 rounded-xs bg-white checked:bg-indigo-800 transition duration-150 checked:rotate-180"
      />
      <label htmlFor={id} className="text-indigo-600 text-sm font-bold">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
