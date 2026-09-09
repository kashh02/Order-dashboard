"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { statusColor } from "@/lib/format";

export default function StatusChart({ data }) {
  return (
    <div className="card">
      <h2>Orders by status</h2>

      {data.length === 0 ? (
        <p className="empty">No orders to show for these filters.</p>
      ) : (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="#eef1f5" vertical={false} />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 12, fill: "#66717f" }}
                tickLine={false}
                axisLine={{ stroke: "#dde3ec" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#66717f" }}
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <Tooltip formatter={(value) => [value, "Orders"]} cursor={{ fill: "#f4f6f9" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={54}>
                {data.map((item) => (
                  <Cell key={item.status} fill={statusColor(item.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
