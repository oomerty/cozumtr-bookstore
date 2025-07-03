interface CardProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={`bg-violet-50 hover:bg-violet-100 rounded outline-1 outline-offset-[-1px] outline-slate-900/10 flex flex-col justify-start items-center gap-5 transition duration-150 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
