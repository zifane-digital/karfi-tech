
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface PerformanceData {
  mois: string;
  chiffreAffaires: number;
  resultat: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

export default function PerformanceChart({
  data,
}: PerformanceChartProps) {
  return (
    <div className="w-full">
      <div className="h-[350px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="karfiBlue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="karfiGold"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#d4af37"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#d4af37"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.15}
            />

            <XAxis
              dataKey="mois"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `${value}M`
              }
            />

            <Tooltip
              formatter={(
                value,
                name
              ) => [
                `${value} M FCFA`,
                name ===
                "chiffreAffaires"
                  ? "Chiffre d'affaires"
                  : "Résultat",
              ]}
            />

            <Area
              type="monotone"
              dataKey="chiffreAffaires"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#karfiBlue)"
            />

            <Area
              type="monotone"
              dataKey="resultat"
              stroke="#d4af37"
              strokeWidth={3}
              fill="url(#karfiGold)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" />

          <span>
            Chiffre d'affaires
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-secondary" />

          <span>
            Résultat
          </span>
        </div>
      </div>
    </div>
  );
}
