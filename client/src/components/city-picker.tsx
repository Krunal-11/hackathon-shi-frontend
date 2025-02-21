"use client";

import { State, City } from "country-state-city";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type TState = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    isoCode: string;
  };
  label: string;
} | null;

type TCity = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

// Default country: India
const defaultCountry = {
  value: {
    latitude: "20.5937",
    longitude: "78.9629",
    isoCode: "IN",
  },
  label: "India",
};

const cropOptions =  [
    "Tomato",
    "Potato",
    "Rice",
    "Wheat",
    "Maize",
    "Soybean",
    "Cotton",
    "Barley",
    "Oats",
    "Rye",
    "Sugarcane",
    "Grapes",
    "Apple",
    "Orange",
    "Banana",
    "Strawberry",
    "Lettuce",
    "Cucumber",
    "Bell Pepper",
    "Eggplant",
    "Carrot",
    "Broccoli",
    "Cauliflower",
    "Cabbage",
    "Spinach",
    "Zucchini",
    "Pumpkin",
    "Watermelon",
    "Melon",
    "Pea",
    "Bean",
    "Sorghum",
    "Millet",
    "Sunflower",
    "Peanut",
    "Almond",
    "Olive",
    "Coffee",
    "Tea",
    "Cocoa",
    "Pineapple",
    "Mango",
    "Papaya",
    "Avocado",
    "Pomegranate",
    "Kiwi",
    "Pear",
    "Plum",
    "Cherry",
    "Grapefruit",
    "Lemon",
    "Lime",
    "Fig",
    "Date Palm",
    "Persimmon",
    "Quinoa",
    "Buckwheat",
    "Amaranth",
    "Kale",
    "Swiss Chard",
    "Radish",
    "Beetroot",
    "Turnip",
    "Sweet Potato",
    "Yam",
    "Ginger",
    "Turmeric",
    "Onion",
    "Garlic",
    "Leek",
    "Asparagus",
    "Artichoke",
    "Okra",
    "Squash",
    "Cantaloupe",
    "Honeydew",
    "Raspberry",
    "Blueberry",
    "Blackberry",
    "Cranberry",
    "Lentil",
    "Chickpea",
    "Pigeon Pea",
    "Mung Bean",
    "Fenugreek",
    "Mustard Greens",
    "Collard Greens",
    "Bok Choy",
    "Arugula",
    "Endive",
    "Radicchio",
    "Watercress",
    "Cilantro",
    "Parsley",
    "Basil",
    "Rosemary",
    "Thyme",
    "Oregano",
    "Sage",
    "Mint"
  ];

export function CityPicker() {
  const [selectedState, setSelectedState] = useState<TState>(null);
  const [selectedCity, setSelectedCity] = useState<TCity>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  
  const router = useRouter();

  const handleStateChange = (stateName: string) => {
    const state = State.getStatesOfCountry(defaultCountry.value.isoCode)?.find(
      (s) => s.name === stateName
    );
    if (state) {
      setSelectedState({
        value: {
          latitude: state.latitude!,
          longitude: state.longitude!,
          countryCode: state.countryCode,
          name: state.name,
          isoCode: state.isoCode,
        },
        label: state.name,
      });
      setSelectedCity(null);
      setSelectedCrop(null);
    }
  };

  const handleCityChange = (cityName: string) => {
    const city = City.getCitiesOfState(
      defaultCountry.value.isoCode,
      selectedState?.value.isoCode!
    )?.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity({
        value: {
          latitude: city.latitude!,
          longitude: city.longitude!,
          countryCode: city.countryCode,
          name: city.name,
          stateCode: city.stateCode,
        },
        label: city.name,
      });
      setSelectedCrop(null);
    }
  };

  const handleContinue = () => {
    if (selectedCrop) {
    localStorage.setItem("selectedCrop", selectedCrop); // Store in localStorage
  }
  
    router.push(
      `/weather/${selectedCity?.value.name}/${selectedCity?.value.latitude}/${selectedCity?.value.longitude}`
    );
  };

  return (
    <Card className="bg-blue-200/40 border-none w-full lg:w-96 m-4">
      <CardHeader className="flex items-center">
        <CardTitle>
          <div className="flex items-center text-white">
            <MapPinIcon className="size-6 mr-2" />
            <h2>Select City & Crop (India)</h2>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* State/District Selector */}
          <Select onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a State" />
            </SelectTrigger>
            <SelectContent>
              {State.getStatesOfCountry(defaultCountry.value.isoCode)?.map(
                (state, index: number) => (
                  <SelectItem key={index} value={state.name}>
                    {state.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          {/* City Selector */}
          <Select onValueChange={handleCityChange} disabled={!selectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              {selectedState &&
                City.getCitiesOfState(
                  defaultCountry.value.isoCode,
                  selectedState.value.isoCode
                )?.map((city, index: number) => (
                  <SelectItem key={index} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Crop Selector */}
          <Select onValueChange={setSelectedCrop} disabled={!selectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Crop" />
            </SelectTrigger>
            <SelectContent>
              {cropOptions.map((crop, index) => (
                <SelectItem key={index} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          disabled={!selectedState || !selectedCity || !selectedCrop}
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
