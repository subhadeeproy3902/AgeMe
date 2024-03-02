"use client";

import clsx from 'clsx';
import { useTheme } from '@/hooks/useTheme';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <>
      <h1 className={clsx("text-base py-10 sm:pt-10", theme == "dark" ? "text-white" : "text-black")}>Made with ❤ by <a target="_blank" className="hover:text-blue-400" href="https://github.com/subhadeeproy3902">Subhadeep</a></h1>
    </>
  )
}

export default Footer