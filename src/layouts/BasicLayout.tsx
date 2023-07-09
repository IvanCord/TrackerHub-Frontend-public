import { useState } from "react";

import { useContext } from "react";

import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import MapIcon from "@mui/icons-material/Map";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import SideBar from "../components/Bars/SideBar/SideBar";
import TopBar from "../components/Bars/TopBar/TopBar";

const navItems = [
  {
    title: "Pedidos",
    link: "/",
    child: <WysiwygIcon />,
  },
  {
    title: "Simulador",
    link: "/simulator",
    child: <MapIcon />,
  },
  {
    title: "Dashboard",
    link: "/dashboard",
    child: <SpaceDashboardIcon />,
  },
  {
    title: "Perfil",
    link: "/profile",
    child: <AccountCircleIcon />,
  },
];

type Props = {
  children: JSX.Element;
};

function BasicLayout({ children }: Props) {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">{children}</main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default BasicLayout;
