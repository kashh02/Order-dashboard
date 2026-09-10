"use client";

import { formatCurrency } from "@/lib/format";

export default function TopProducts({ data }) {
  const highest = data.length > 0 ? data[0].revenue : 0;

  return (
    <div className="card">
      <h2>Top 5 products</h2>

      {data.length === 0 ? (
        <p className="empty">No products to show for these filters.</p>
      ) : (
        <ul className="product-list">
          {data.map((item,index) => (
            <li className="product-row" key={item.product}>
              <span> 
                <strong>#{index+1}</strong> {item.product}
              </span>
              <span className="revenue">{formatCurrency(item.revenue)}</span>
              <span className="units">{item.quantity} units sold</span>
              <span className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${highest ? (item.revenue / highest) * 100 : 0}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
