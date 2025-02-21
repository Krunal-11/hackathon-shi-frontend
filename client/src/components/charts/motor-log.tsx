"use client";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { time: "21:05:39", value: 1 },
  { time: "21:05:51", value: 0 },
  { time: "21:05:55", value: 1 },
  { time: "21:05:59", value: 0 },
  { time: "21:06:47", value: 1 },
  { time: "21:06:51", value: 0 },
  { time: "21:06:59", value: 1 },
  { time: "21:07:03", value: 0 },
  { time: "21:07:07", value: 1 },
  { time: "21:07:11", value: 0 },
];

export default function MotorLog() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Motor Log</CardTitle>
        <CardDescription>Motor Operation Log</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
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
