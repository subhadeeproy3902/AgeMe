"use client";

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod"
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";


const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function DateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [showAge, setShowAge] = useState<Boolean>(false)

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const [moreDOB, setMoreDOB] = useState<Boolean>(false)
  const [bornToday, setBornToday] = useState<Boolean>(false)

  const calculateAge = (e: any) => {
    e.preventDefault();
    const dob = document.getElementById("dob") as HTMLInputElement;
    if (!dob.value) {
      return;
    }
    const birthDate = new Date(dob.value);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    if (years === 0 && months === 0 && days === 0) {
      setBornToday(true);
      setShowAge(false);
      setMoreDOB(false);
      return;
    }

    if (years < 0 || months < 0 || days < 0) {
      setMoreDOB(true);
      setShowAge(false);
      setBornToday(false);
      return;
    }

    setAge({
      years,
      months,
      days,
    });

    setShowAge(true);
    setBornToday(false);
    setMoreDOB(false);
  };

  const { theme } = useTheme();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };


  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-start gap-6 p-2 text-center sm:p-4">
        <div className="p-2">
          <p className={clsx("font-thin  opacity-80 text-base tracking-wide", theme === "dark" ? "text-white" : "text-black")}>Enter your date of birth to calculate your age.</p>
          <form className="mt-5 flex flex-col gap-2 items-center justify-center">
            <div className="flex justify-center gap-x-2 w-full items-center my-6 date-input-container">
              <label htmlFor="dob">Date of Birth :</label>
              <input
                type="date"
                name="dob" id="dob"
                className={clsx(
                  "border border-zinc-300 bg-transparent  font-medium text-white w-1/2 p-1 px-2 rounded-md",
                  theme === "dark" ? "" : "invert"
                )}
                max={getCurrentDate()}
                min="1925-01-01"
                placeholder="Date of Birth"
                required
              />
            </div>
            <Button
              type="submit"
              className="py-1 px-3 mt-3 font-extrabold text-lg tracking-wider text-black rounded-xl w-2/3 hover:scale-95 transition-all duration-200"
              onClick={(e) => calculateAge(e)}
            >
              Calculate
            </Button>
          </form>

          {moreDOB ? (
            <>
              <p className="text-lg text-red-300">So were you born in the future ?</p>
            </>
          ) : bornToday ? (
            <div className="border-none p-3 px-5 mt-16 rounded-lg bg-teal-200 leading-none">
              <div className="text-center">
                <p className="text-xl text-black font-medium">Wow you have taken birth today!!</p>
              </div>
            </div>
          ) : showAge ? (
            <div className="border-none p-3 px-5 mt-16 rounded-lg bg-teal-200 leading-none">
              <div className="text-center">
                <p className="text-xl text-black font-medium">
                  Your are {' '}
                  {age.years > 0 && (
                    <span>
                      <span className="text-red-500 text-2xl font-extrabold font-mono">{age.years}</span> Years,
                    </span>
                  )}
                  {age.months > 0 && (
                    <span>
                      {' '}
                      <span className="text-red-500 font-mono text-2xl font-extrabold">{age.months}</span> Months, {" "}
                    </span>
                  )}
                  <span className="text-red-500 font-mono text-2xl font-extrabold">{age.days}</span> Days old.
                </p>
              </div>
            </div>
          ) : null
          }
        </div>
      </div>

    </>
  );
}
