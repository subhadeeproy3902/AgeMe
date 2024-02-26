"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MouseEvent, useState } from "react";
import { z } from "zod"
import { Form } from "@/components/ui/form";
import { TextRevealCard } from "./ui/text-reveal-card";
import { set } from "date-fns";


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
      return;
    }

    if (years < 0 || months < 0 || days < 0) {
      setMoreDOB(true);
      return;
    }

    setAge({
      years,
      months,
      days,
    });

    setShowAge(true);
  };


  return (
    <>
      <Card className="w-full max-w-sm mb-10">
        <CardHeader className="p-6 flex flex-col justify-center items-center">
          <CardTitle className="text-xl">Age Calculator</CardTitle>
          <CardDescription>Enter your birthdate to calculate your age.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col gap-2 items-center justify-center">
            <form className="flex flex-col gap-2 items-center justify-center">
              <label htmlFor="dob">Enter DOB</label>
              <input type="date" name="dob" id="dob" required className="bg-slate-700 w-full rounded-sm p-2 m-2 ring-1 ring-offset-2 ring-sky-500 border-2 border-slate-700 ring-offset-transparent" />
              <Button
                type="submit"
                className="py-1 px-3 rounded bg-blue-400"
                onClick={(e) => calculateAge(e)}
              >
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {showAge ? (
        <p className="text-lg">Your age is <span className="text-sky-400 font-bold">{age.years}</span> Years, <span className="text-sky-400 font-bold">{age.months}</span> Months, <span className="text-sky-400 font-bold">{age.days}</span> Days.</p>
      ) : moreDOB ? (
        <p className="text-lg text-red-300">So were you born in the future ?</p>
      ) : bornToday ? (
        <p className="text-lg text-green-300">Wow you have taken birth today!!</p>
      ) : null
    }
    </>
  )
}
