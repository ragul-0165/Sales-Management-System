import "../styles/filterBar.css";
import { useState, useEffect, useRef } from "react";

export default function FilterBar({ filters, setFilters }) {

  // For opening / closing dropdowns
  const [open, setOpen] = useState("");
  const barRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpen("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleMenu(menu) {
    setOpen(prev => prev === menu ? "" : menu);
  }

  // MULTI SELECT HANDLER
  function updateMulti(key, value) {
    const existing = filters[key] ? filters[key].split(",") : [];
    const exists = existing.includes(value);

    const updated = exists
      ? existing.filter(v => v !== value)
      : [...existing, value];

    setFilters(prev => ({
      ...prev,
      [key]: updated.join(","),
      page: 1,
    }));
  }

  // CHECK IF SELECTED
  function isChecked(key, value) {
    if (!filters[key]) return false;
    return filters[key].split(",").includes(value);
  }

  // RESET
  function resetFilters() {
    setFilters({
      ...filters,
      search: "",
      regions: "",
      genders: "",
      categories: "",
      tags: "",
      paymentMethods: "",
      ageMin: "",
      ageMax: "",
      date: "",
      dateFrom: "",
      dateTo: "",
      sort: "date",
      order: "desc",
      page: 1,
    });
  }

  return (
    <div className="filter-bar" ref={barRef}>

      {/* Reset button */}
      <button className="reset-btn" onClick={resetFilters}>
        <span className="icon">⟳</span>
      </button>

      {/* REGION */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("regions")}>
          Region
        </button>

        {open === "regions" && (
          <div className="dropdown">
            {["North", "South", "East", "West", "Central"].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("regions", opt)}
                  onChange={() => updateMulti("regions", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* GENDER */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("genders")}>
          Gender
        </button>

        {open === "genders" && (
          <div className="dropdown">
            {["Male", "Female"].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("genders", opt)}
                  onChange={() => updateMulti("genders", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* AGE */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("age")}>
          Age Range
        </button>

        {open === "age" && (
          <div className="dropdown">
            {[
              "18–25",
              "26–35",
              "36–45",
              "46+",
            ].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("ageMin", opt)}
                  onChange={() => updateMulti("ageMin", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* CATEGORY */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("categories")}>
          Category
        </button>

        {open === "categories" && (
          <div className="dropdown">
            {["Beauty", "Clothing", "Electronics"].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("categories", opt)}
                  onChange={() => updateMulti("categories", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* TAGS */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("tags")}>
          Tags
        </button>

        {open === "tags" && (
          <div className="dropdown">
            {[
              "organic",
              "skincare",
              "makeup",
              "fragrance-free",
              "wireless",
              "portable",
              "smart",
              "gadgets",
            ].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("tags", opt)}
                  onChange={() => updateMulti("tags", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PAYMENT */}
      <div className="multi-select">
        <button className="select-btn" onClick={() => toggleMenu("payment")}>
          Payment
        </button>

        {open === "payment" && (
          <div className="dropdown">
            {["UPI", "Cash", "Card"].map(opt => (
              <label key={opt}>
                <input
                  type="checkbox"
                  checked={isChecked("paymentMethods", opt)}
                  onChange={() => updateMulti("paymentMethods", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* DATE */}
<div className="multi-select">
  <button className="select-btn" onClick={() => toggleMenu("date")}>
    Date
  </button>

  {open === "date" && (
    <div className="dropdown">
      {[
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "This Year", value: "year" },
        { label: "Custom", value: "custom" },
      ].map(opt => (
        <label key={opt.value}>
          <input
            type="checkbox"
            checked={isChecked("date", opt.value)}
            onChange={() => updateMulti("date", opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )}
</div>


      {/* SORT (unchanged) */}
      <select
        value={`${filters.sort}:${filters.order}`}
        onChange={(e) => {
          const [sort, order] = e.target.value.split(":");
          setFilters(prev => ({
            ...prev,
            sort,
            order,
            page: 1,
          }));
        }}
      >
        <option value="customer_name:asc">Sort by: Customer Name (A–Z)</option>
        <option value="customer_name:desc">Sort by: Customer Name (Z–A)</option>
        <option value="quantity:desc">Quantity (High → Low)</option>
        <option value="quantity:asc">Quantity (Low → High)</option>
        <option value="date:desc">Date (Newest First)</option>
        <option value="date:asc">Date (Oldest First)</option>
      </select>

    </div>
  );
}
