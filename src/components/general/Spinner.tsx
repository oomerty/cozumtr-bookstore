interface SpinnerProps {
  fullScreen?: boolean;
}

function Spinner({ fullScreen }: SpinnerProps) {
  return (
    <div
      className={`h-full flex items-center justify-center ${
        fullScreen && "h-screen"
      }`}
    >
      <img src="/icon/progress_activity.svg" alt="" />
    </div>
  );
}

export default Spinner;
