import MoistureLog from "@/components/charts/moisture-log";
import MotorLog from "@/components/charts/motor-log";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900/90 via-blue-400/90 to-blue-200/90">
      <Navbar />
      <h1 className="text-6xl text-white m-4">Dashboard</h1>
      <div className="w-full p-4 flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-center">
        <div className="md:w-1/2">
          <MoistureLog />
        </div>
        <div className="md:w-1/2">
          <MotorLog />
        </div>
      </div>
    </main>
  );
}
