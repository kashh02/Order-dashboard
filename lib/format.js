
export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);
}


export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const STATUS_COLORS = {
  Delivered: "#1f6f5c",
  Shipped: "#3b6fb6",
  Pending: "#c08a2e",
  Cancelled: "#b2453c"
};

export function statusColor(status) {
  return STATUS_COLORS[status] || "#66717f";
}
