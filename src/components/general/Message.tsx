interface MessageProps {
  children?: React.ReactNode;
  title?: string;
  message?: string;
}

function Message({ children, title, message }: MessageProps) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 ">
      {title && message && (
        <>
          <h1 className="text-orange-600 text-2xl font-bold">{title}</h1>
          <p className="text-slate-900/60 text-base font-normal">{message}</p>
        </>
      )}
      {children && children}
    </div>
  );
}

export default Message;
