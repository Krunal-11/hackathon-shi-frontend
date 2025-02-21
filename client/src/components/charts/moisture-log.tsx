"use client";

import { useState, useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataPoint {
  time: string;
  value: number;
}

const data = [
  { time: "21:06:39", value: 411 },
  { time: "21:06:43", value: 430 },
  { time: "21:06:47", value: 1008 },
  { time: "21:06:51", value: 419 },
  { time: "21:06:55", value: 641 },
  { time: "21:06:59", value: 879 },
  { time: "21:07:03", value: 450 },
  { time: "21:07:07", value: 875 },
  { time: "21:07:11", value: 365 },
  { time: "21:07:16", value: 370 },
];

export default function MoistureLog() {
  // const [data, setData] = useState<DataPoint[]>([]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newDataPoint: DataPoint = {
  //       time: new Date().toLocaleTimeString(),
  //       value: Math.floor(Math.random() * 1000) + 300, // Random moisture level
  //     };

  //     setData((prevData) => [...prevData.slice(-9), newDataPoint]);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moisture Log</CardTitle>
        <CardDescription>Sand Moisture Levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ top: 20, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
