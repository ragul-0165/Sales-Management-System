import "../styles/salesTable.css";
import { FiCopy } from "react-icons/fi";

export default function SalesTable({
  loading,
  data,
  filters,
  setFilters,
  totalPages,
}) {
  function handleSort(column) {
    setFilters((prev) => {
      if (prev.sort === column) {
        const nextOrder = prev.order === "asc" ? "desc" : "asc";
        return { ...prev, order: nextOrder, page: 1 };
      } else {
        return { ...prev, sort: column, order: "asc", page: 1 };
      }
    });
  }

  function sortLabel(column, label) {
    if (filters.sort !== column) return label;
    return `${label} ${filters.order === "asc" ? "▲" : "▼"}`;
  }

  function goToPage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;
    setFilters((prev) => ({ ...prev, page: nextPage }));
  }

  function copyToClipboard(text) {
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Phone number copied");
        })
        .catch(() => {
          alert("Unable to copy");
        });
    } else {
      
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Phone number copied");
      } catch (e) {
        alert("Unable to copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  if (loading) {
    return (
      <div className="table-container">
        <div className="placeholder">Loading...</div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="table-container">
        <div className="placeholder">No results found</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      {/* scrollable area */}
      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>
                {sortLabel("date", "Date")}
              </th>
              <th>Customer ID</th>
              <th onClick={() => handleSort("customer_name")}>
                {sortLabel("customer_name", "Customer name")}
              </th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th onClick={() => handleSort("age")}>
                {sortLabel("age", "Age")}
              </th>
              <th>Product Category</th>
              <th onClick={() => handleSort("quantity")}>
                {sortLabel("quantity", "Quantity")}
              </th>
              <th>Total Amount</th>
              <th>Customer region</th>
              <th>Product ID</th>
              <th>Employee name</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const formattedDate = row.date
                ? new Date(row.date).toISOString().split("T")[0]
                : "";

              const formattedAmount = row.final_amount
                ? `₹ ${Number(row.final_amount).toLocaleString("en-IN")}`
                : "₹ 0";

              const phone = row.phone_number
                ? `+91 ${row.phone_number}`
                : "";

              const productIdFormatted = row.product_id
                ? `PROD${String(row.product_id)
                    .replace(/\D/g, "")
                    .padStart(5, "0")}`
                : "";

              return (
                <tr key={row._id || row.transaction_id}>
                  <td className="col-date">{formattedDate}</td>
                  <td className="col-customer-id">{row.customer_id?.replace(/[-–]/g, "").trim()}</td>
                  <td className="col-customer-name">{row.customer_name}</td>

                  <td className="phone-cell col-phone">
                    <span className="phone-text">{phone}</span>
                    {phone && (
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(phone)}
                        title="Copy phone number"
                        type="button"
                      >
                        <FiCopy size={12} />
                      </button>
                    )}
                  </td>

                  <td className="col-gender">{row.gender}</td>
                  <td className="col-age">{row.age}</td>
                  <td className="col-category">{row.product_category}</td>
                  <td className="col-qty num">{row.quantity}</td>
                  <td className="col-amount num">{formattedAmount}</td>
                  <td className="col-region">{row.customer_region}</td>
                  <td className="col-product-id">{productIdFormatted}</td>
                  <td className="col-employee">{row.employee_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination bar fixed outside scroll */}
      <div className="pagination-bar">
        <button
          className="pg-btn"
          disabled={filters.page <= 1}
          onClick={() => goToPage(filters.page - 1)}
          type="button"
        >
          Previous
        </button>

        {(() => {
          const maxButtons = 6;
          const pages = [];
          const current = filters.page;
          const total = totalPages;

          let start = current - 2;
          if (start < 1) start = 1;

          let end = start + maxButtons - 1;
          if (end > total) {
            end = total;
            start = Math.max(end - maxButtons + 1, 1);
          }

          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                className={`pg-btn ${i === current ? "active" : ""}`}
                onClick={() => goToPage(i)}
                type="button"
              >
                {i}
              </button>
            );
          }

          return pages;
        })()}

        <button
          className="pg-btn"
          disabled={filters.page >= totalPages}
          onClick={() => goToPage(filters.page + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
