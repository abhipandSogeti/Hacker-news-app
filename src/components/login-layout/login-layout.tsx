import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme-provider/theme-provider";

export default function LoginLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <div className="flex justify-center pt-64">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
