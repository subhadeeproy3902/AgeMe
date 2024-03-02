"use client";

import { DateForm } from "@/components/DateForm";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {

  const { theme } = useTheme();

  return (
    <main
      className={clsx(
        "relative h-screen antialiased flex flex-col justify-between items-center overflow-hidden",
        theme === "dark" ? "bg-slate-950" : "bg-slate-200",
      )}
    >
      <Header />
      <div
        className={clsx(
          "absolute left-1/2 top-[50%] flex h-[75vh] -translate-x-1/2 text-center -translate-y-1/2 flex-col justify-between gap-2 sm:rounded-2xl p-2 shadow-lg shadow-slate-400/15 max-lg:w-[60vw] max-md:w-[70vw] max-sm:top-[62%] max-sm:w-full lg:w-[40vw]",
          theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-black",
        )}
      >
        <h1 className="text-[6vh] font-extralight mt-8 tracking-tight">
        Age Calculator
      </h1>
        <DateForm />
      </div>
      <Footer />
    </main>
  );
}
