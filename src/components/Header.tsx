"use client";


import { MdLightMode } from "react-icons/md";
import { HiMoon } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="relative h-[25%] w-full">
      <img
        className="h-full w-full object-cover object-center sm:rounded-b-[2.5rem]"
        src="/image.png"
      />
      <button
        className="absolute border border-orange-500 -right-0 top-1/2 mr-6 mt-3 rounded-full p-2 shadow-md backdrop-blur-xl duration-150 ease-in-out hover:scale-105"
        onClick={handleClick}
      >
        {theme === "dark" ? (
          <MdLightMode className="h-6 w-6 text-black" />
        ) : (
          <HiMoon className="h-6 w-6 text-black" />
        )}
      </button>
    </header>
  );
};

export default Header;