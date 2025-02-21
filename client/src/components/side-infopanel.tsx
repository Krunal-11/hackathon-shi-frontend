import { CityPicker } from "./city-picker";

type Props = {
  city: string;
  lat: string;
  long: string;
};

export function SideInfopanel({ city, lat, long }: Props) {
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

      <div className="pt-16">
        <CityPicker />
      </div>
    </div>
  );
}
