"use client";

import { formatCurrency, statusColor } from "@/lib/format";

export default function SummaryCards({ totalOrders, totalRevenue, ordersByStatus }) {
  return (
    <div className="summary-grid">
      <div className="card">
        <div className="metric-label">Total orders</div>
        <div className="metric-value">{totalOrders}</div>
      </div>

      <div className="card">
        <div className="metric-label">Total revenue</div>
        <div className="metric-value">{formatCurrency(totalRevenue)}</div>
        <div className="metric-note">Excludes cancelled orders</div>
      </div>

      <div className="card">
        <div className="metric-label">Orders by status</div>
        <div className="status-lines">
          {ordersByStatus.length === 0 ? (
            <span className="metric-label">No orders in this range</span>
          ) : (
            ordersByStatus.map((item) => (
              <div className="status-line" key={item.status}>
                <span className="dot" style={{ background: statusColor(item.status) }} />
                <span>{item.status}</span>
                <span>{item.count}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
