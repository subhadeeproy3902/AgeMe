import { DateForm } from "@/components/DateForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-5 justify-between items-center">
      <div className="mt-5">
        <h1 className="text-3xl sm:text-5xl font-bold">See your age</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <DateForm />
      </div>
      <div></div>
      <Footer />
    </main>
  );
}
