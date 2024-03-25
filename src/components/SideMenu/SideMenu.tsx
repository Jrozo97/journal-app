import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SideMenu = () => {

  const routes = useRouter();

  const option = [
    {
      id: 1,
      name: "Notas Rapidas",
      url: "/notes",
      icon: (disable: boolean) => {
        return disable
          ? "./icons/noteDisabled.svg"
          : "./icons/notesEnabled.svg";
      },
    },
    {
      id: 2,
      name: "Por hacer",
      url: "/todos",
      icon: (disable: boolean) => {
        return disable
          ? "./icons/todoDisabled.svg"
          : "./icons/todoEnabled.svg";
      },
    },
    {
      id: 3,
      name: "Recordatorio",
      url: "/calendar",
      icon: (disable: boolean) => {
        return disable
          ? "./icons/calendarDisabled.svg"
          : "./icons/calendarEnabled.svg";
      },
    },
  ];

  return (
    <div className="flex flex-col px-6 py-20 bg-green-white w-[15.55vw] shadow-custom-tooltip items-center">
      <Image src="icons/logo-journal.svg" alt="logo" width={100} height={100} />
      <h1 className="font-semibold text-primary italic text-3xl mt-3">JournalApp</h1>

      <div className="flex flex-col gap-6 mt-24">
        {option.map((item) => {
          const isEnabled = routes.pathname === item.url;
          console.log("isEnabled", isEnabled)
          return (
            <div
              key={item.id}
              className={`py-2 px-5 rounded-md flex items-center justify-center cursor-pointer ${isEnabled ? "bg-secondary" : "bgr-green-white"}`}
              onClick={() => routes.push(item.url)}
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <Image
                  src={item.icon(!isEnabled)}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <p className={`text-base font-semibold ${isEnabled ? "text-white" : "text-gray"}`}>
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
