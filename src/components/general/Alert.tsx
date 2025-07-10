import { useEffect, useState } from "react";
import Card from "./Card";

interface AlertProps {
  title: string;
  text?: string;
}

function Alert({ title, text }: AlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  function handleClose() {
    setShow(false);
  }

  return (
    <Card
      onClick={() => handleClose()}
      className={`items-start fixed left-3 bottom-3 px-4 py-2 !gap-1 min-w-full md:max-w-1/2 md:min-w-1/3 starting:-left-3 ${
        !show && "hidden"
      }`}
    >
      <p className="text-sm font-semibold text-slate-900 uppercase">{title}</p>
      <p className="text-base font-medium text-slate-900/80">{text}</p>
    </Card>
  );
}

export default Alert;
