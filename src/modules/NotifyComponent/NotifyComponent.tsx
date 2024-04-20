import toast, { Toast } from "react-hot-toast";
import React from "react";
import Image from "next/image";
import { NotifyComponentProps, NotifyProps } from "@/types/components.types";

const NotifyComponent = ({
  t,
  image,
  classAnimated,
  content,
  title,
}: NotifyComponentProps) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-80 w-full h-16 bg-white shadow-custom-notify justify-between rounded-lg pointer-events-auto flex pr-4 pl-2 py-3`}
  >
    <div className="flex items-center justify-center gap-4">
      <Image
        src={image}
        alt="search"
        width={40}
        height={40}
        className={` ${classAnimated && "animate-spin"}`}
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-xs font-medium text-black">{content}</p>
      </div>
    </div>

    <button
      onClick={() => toast.remove(t.id)}
      className="text-2xl font-medium text-black "
    >
      x
    </button>
  </div>
);

export const notify = ({
  image,
  classAnimated,
  content,
  title,
}: NotifyProps) => {
  toast.custom(
    (t: Toast) => (
      <NotifyComponent
        t={t}
        image={image}
        classAnimated={classAnimated}
        content={content}
        title={title}
      />
    ),
    {
      duration: 3000,
      style: {
        padding: 0,
      },
      
    }
  );
};

export default notify;
