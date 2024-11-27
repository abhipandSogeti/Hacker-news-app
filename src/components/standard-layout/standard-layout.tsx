import { Outlet } from "react-router-dom";
import Header from "../header/header";
import { ThemeProvider } from "../theme-provider/theme-provider";

export default function StandardLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
