import { journalTheme } from "@/styles/muiTheme";
import React from "react";
import { ThemeProvider } from "styled-components";
import SideMenu from "../SideMenu";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <ThemeProvider theme={journalTheme}>
      <div className="flex flex-row h-screen w-screen">
        <SideMenu />
        <div className="flex flex-col pr-20 pt-20 pl-16 w-[84.45vw]">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
