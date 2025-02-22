import MoistureLog from "@/components/charts/moisture-log";
import MotorLog from "@/components/charts/motor-log";
import { CityPicker } from "@/components/city-picker";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900/90 via-blue-400/90 to-blue-200/90">
      <Navbar />
      <CityPicker />
    </main>
  );
}

