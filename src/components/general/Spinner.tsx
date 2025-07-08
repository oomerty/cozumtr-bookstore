interface SpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

function Spinner({ fullScreen, className }: SpinnerProps) {
  return (
    <div
      className={`h-full flex items-center justify-center ${
        fullScreen && "h-screen"
      } ${className && className}`}
    >
      <img src="/icon/progress_activity.svg" alt="" />
    </div>
  );
}

export default Spinner;
