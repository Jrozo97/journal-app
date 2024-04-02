import { selectUser } from "@/slices/userSlice";
import { useAppSelector } from "@/src/hooks/reduxHook";
import React from "react";
import { HeaderPageProps } from "./utils/HeaderPageProps.type";

const HeaderPage: React.FC<HeaderPageProps> = ({ titleHeader }) => {
  const user = useAppSelector(selectUser);
  const date = new Date();
  const nameSplit = user.name.split(" ");
  const formatDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  return (
    <div className="flex flex-row w-full h-auto justify-between items-center">
      <h1 className="text-4xl font-bold text-primary">{titleHeader}</h1>
      <div className="flex flex-col gap-1 items-end ">
        <p className="text-xl font-semibold text-primary">
          ¡Hola, {nameSplit[0]}!
        </p>
        <p className="text-sm font-normal text-gray">{formatDate}</p>
      </div>
    </div>
  );
};

export default HeaderPage;
