import "../styles/metricCards.css";

import { Info } from "lucide-react";

export default function MetricCards({ data }) {
  // Total units sold
  const totalUnits = data.reduce((sum, row) => sum + (row.quantity || 0), 0);

  // Total amount before discount
  const totalAmount = data.reduce(
    (sum, row) => sum + (row.total_amount || 0),
    0
  );

  // Discount value
  const totalDiscountValue = data.reduce((sum, row) => {
    const amt = row.total_amount || 0;
    const pct = row.discount_percentage || 0;
    return sum + (amt * pct) / 100;
  }, 0);

  // SRs counts
  const amountSRs = totalUnits;
  const discountSRs = totalUnits;

  // Format money values
  const formatCurrency = (num) =>
    num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
    <div className="metrics-container">
      {/* Total Units */}
      <div className="metric-card">
        <div className="metric-label">
          Total units sold <Info size={14} className="metric-icon" />
        </div>

        <div className="metric-value">{totalUnits}</div>
      </div>

      {/* Total Amount */}
      <div className="metric-card">
        <div className="metric-label">
          Total Amount <Info size={14} className="metric-icon" />
        </div>

        <div className="metric-value">
          {formatCurrency(totalAmount)}
          <span className="metric-small">({amountSRs} SRs)</span>
        </div>
      </div>

      {/* Total Discount */}
      <div className="metric-card">
        <div className="metric-label">
          Total Discount <Info size={14} className="metric-icon" />
        </div>

        <div className="metric-value">
          {formatCurrency(totalDiscountValue)}
          <span className="metric-small">({discountSRs} SRs)</span>
        </div>
      </div>
    </div>
  );
}
