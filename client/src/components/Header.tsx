import React, { useEffect } from "react";
import { CloudDrizzle, MoonIcon, SunIcon } from "lucide-react";

function Header() {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setTheme(html.classList.contains("dark") ? "dark" : "light");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  };

  useEffect(() => {
    const html = document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme) {
      html.classList.toggle("dark", theme === "dark");
      setTheme(theme);
    }
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-b from-violet-700 to-violet-400 text-white dark:from-violet-900 dark:to-violet-950 shadow ">
      <h3 className="flex items-center gap-1">
        <CloudDrizzle /> Weather Forecast
      </h3>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 hover:cursor-pointer border border-violet-400 rounded-2xl p-1 sm:px-3 sm:py-1 outline-none hover:bg-violet-400/20 transition"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span className="opacity-80 text-sm hidden sm:block">
          Change Appearance
        </span>
      </button>
    </header>
  );
}

export default Header;
