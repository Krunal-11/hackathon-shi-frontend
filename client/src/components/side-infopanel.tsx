"use client"; // Ensure this runs on the client side

import { useEffect, useState } from "react";

type Props = {
  city: string;
  lat: string;
  long: string;
};

// Define type for API response
type MoistureData = {
  moisture: number;
};

export function SideInfopanel({ city, lat, long }: Props) {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [moisture, setMoisture] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the selected crop from localStorage
    const crop = localStorage.getItem("selectedCrop");
    if (crop) {
      setSelectedCrop(crop);
      fetchMoistureData(crop);
    } else {
      setLoading(false);
      setError("No crop selected.");
    }
  }, []);

  const fetchMoistureData = async (crop: string) => {
    const cleanCrop = crop.split(":")[0].trim();
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/moisture?plant=${encodeURIComponent(cleanCrop)}`
      );
      if (!response.ok) throw new Error("Failed to fetch moisture data");

      const data: MoistureData = await response.json();
      setMoisture(data.moisture); // ✅ Store only `moisture`
      setLoading(false);
    } catch (err) {
      setError("Error fetching moisture data.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-10 bg-gradient-to-b from-blue-900/90 via-blue-400/90 to-blue-200/90 lg:w-[480px]">
      <div className="pb-5">
        <h1 className="text-6xl font-bold text-white mb-2">
          {decodeURI(city)}
        </h1>
        <p className="text-xs text-gray-200">
          Lat/Long: {lat}, {long}
        </p>
      </div>

      <div className="pt-6">
        {loading ? (
          <p className="text-white">Loading moisture data...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : moisture !== null ? ( // ✅ Use `moisture` from state
          <div className="text-white">
            <h2 className="text-lg font-semibold">
              Moisture Data for {selectedCrop}
            </h2>
            <p>🌱 Optimum Soil Moisture: {moisture}%</p>
             {/* ✅ Fixed reference */}
          </div>
        ) : (
          <p className="text-white">No data available.</p>
        )}
      </div>
    </div>
  );
}
