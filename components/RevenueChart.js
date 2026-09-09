"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency, formatDate } from "@/lib/format";

export default function RevenueChart({data}) {
  const chartData = data.map((item) => ({
    label: formatDate(item.date),
    revenue: item.revenue
  }));

  return (
    <div className="card">
      <h2>Revenue over time</h2>

      {chartData.length === 0 ? (
        <p className="empty">No revenue to show for these filters.</p>
      ) : (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="#eef1f5" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#66717f" }}
                tickLine={false}
                axisLine={{ stroke: "#dde3ec" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#66717f" }}
                tickLine={false}
                axisLine={false}
                width={64}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip formatter={(value) => [formatCurrency(value), "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1f6f5c"
                strokeWidth={2}
                dot={{ r: 3, fill: "#1f6f5c" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
