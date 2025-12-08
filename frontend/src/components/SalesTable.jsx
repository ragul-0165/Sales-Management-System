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
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  }

  if (loading) {
    return (
      <div className="table-container">
        <div className="placeholder">Loading...</div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="table-container">
        <div className="placeholder">No results found</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      
      {/* SCROLLABLE WRAPPER */}
      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction ID</th>

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

              <th>Final Amount</th>

              <th>Customer region</th>

              <th>Product ID</th>

              <th>Employee name</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const phoneDisplay = `+91 ${row.phone_number}`;

              return (
                <tr key={row.transaction_id}>
                  <td>{row.transaction_id}</td>
                  <td>{row.date}</td>
                  <td>{row.customer_id}</td>
                  <td>{row.customer_name}</td>

                  {/* PHONE + COPY ICON */}
                  <td className="phone-cell">
                    <span className="phone-text">{phoneDisplay}</span>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(phoneDisplay)}
                      title="Copy phone number"
                    >
                      <FiCopy size={13} />
                    </button>
                  </td>

                  <td>{row.gender}</td>
                  <td>{row.age}</td>
                  <td>{row.product_category}</td>
                  <td>{row.quantity}</td>
                  <td>
                    ₹{Number(row.final_amount || 0).toLocaleString("en-IN")}
                  </td>
                  <td>{row.customer_region}</td>
                  <td>{row.product_id}</td>
                  <td>{row.employee_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION OUTSIDE SCROLL */}
      <div className="pagination-bar">

        {/* Prev Button */}
        <button
          className="pg-btn"
          disabled={filters.page <= 1}
          onClick={() => goToPage(filters.page - 1)}
        >
          Previous
        </button>

        {/* Page Numbers */}
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
              >
                {i}
              </button>
            );
          }

          return pages;
        })()}

        {/* Next Button */}
        <button
          className="pg-btn"
          disabled={filters.page >= totalPages}
          onClick={() => goToPage(filters.page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
