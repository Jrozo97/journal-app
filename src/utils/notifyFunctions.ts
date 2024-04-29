import toast from "react-hot-toast";
import notify from "../modules/NotifyComponent/NotifyComponent";

export const notificationSuccess = ({title, content}: {title: string; content: string}) => {
  notify({
    title: title,
    content: content,
    image: "/icons/iconSuccess.svg",
  });
};

export const notificationError = ({title, content}: {title: string; content: string}) => {
  notify({
    title: title,
    content: content,
    image: "/icons/infoGray.svg",
  });
};

export const notificationLoadProcess = ({title, content}: {title: string; content: string}) => {
  notify({
    title: title,
    content: content,
    image: "/icons/loading.png",
    classAnimated: true,
  });
};

export const removeNotify = () => {
  toast.remove();
};
