import { selectUser } from "@/slices/userSlice";
import { useAppSelector } from "@/src/hooks/reduxHook";
import React, { useContext } from "react";
import { HeaderPageProps } from "./utils/HeaderPageProps.type";
import { DarkModeContext } from "@/context/darkModeContext";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const HeaderPage: React.FC<HeaderPageProps> = ({ titleHeader }) => {
  const user = useAppSelector(selectUser);
  const date = new Date();
  const { theme, handleChangeTheme } = useContext(DarkModeContext);

  const nameSplit = user.name.split(" ");
  const formatDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log("theme", theme);



  return (
    <header className="flex flex-row w-full h-auto justify-between items-center">
      <h2 className="text-4xl font-bold text-primary dark:text-dark-green">{titleHeader}</h2>
      <div className="flex flex-col gap-1 items-end ">
        <div className="flex gap-4 items-center">
          <p className="text-xl font-semibold text-primary dark:text-dark-green">
            ¡Hola, {nameSplit[0]}!
          </p>
          <button className="shadow-custom-tooltip p-1 w-6 h-6 flex items-center rounded-md dark:bg-dark-gray" onClick={handleChangeTheme}>
          {theme === 'dark' ? <Brightness7Icon sx={{width: 16, height: 16, color: "white" }} /> : <Brightness4Icon sx={{width: 16  }} />}
          </button >
        </div>

        <p className="text-sm font-normal text-gray dark:text-white/70">{formatDate}</p>
      </div>
    </header>
  );
};

export default HeaderPage;
