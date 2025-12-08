import "../styles/filterBar.css";


export default function FilterBar({ filters, setFilters }) {
  function update(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  }

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
      dateFrom: "",
      dateTo: "",
      sort: "date",
      order: "desc",
      page: 1
    });
  }

  return (
    
    <div className="filter-bar">

      {/* Reset icon button */}
      <button className="reset-btn" onClick={resetFilters}>
        <span className="icon">⟳</span>
      </button>

      {/* Region */}
      <select
        value={filters.regions}
        onChange={(e) => update("regions", e.target.value)}
      >
        <option value="">Customer Region</option>
        <option>North</option>
        <option>South</option>
        <option>East</option>
        <option>West</option>
        <option>Central</option>
      </select>

      {/* Gender */}
      <select
        value={filters.genders}
        onChange={(e) => update("genders", e.target.value)}
      >
        <option value="">Gender</option>
        <option>Female</option>
        <option>Male</option>
      </select>

      {/* Age */}
      <select
        value={filters.ageMin}
        onChange={(e) => update("ageMin", e.target.value)}
      >
        <option value="">Age Range</option>
        <option value="18">18–25</option>
        <option value="26">26–35</option>
        <option value="36">36–45</option>
        <option value="46">46+</option>
      </select>

      {/* Category */}
      <select
        value={filters.categories}
        onChange={(e) => update("categories", e.target.value)}
      >
        <option value="">Product Category</option>
        <option>Beauty</option>
        <option>Clothing</option>
        <option>Electronics</option>
      </select>

      {/* Tags */}
<select
  value={filters.tags}
  onChange={(e) => update("tags", e.target.value)}
>
  <option value="">Tags</option>
  <option value="organic">Organic</option>
  <option value="skincare">Skincare</option>
  <option value="makeup">Makeup</option>
  <option value="fragrance-free">Fragrance-free</option>
  <option value="wireless">Wireless</option>
  <option value="portable">Portable</option>
  <option value="smart">Smart</option>
  <option value="gadgets">Gadgets</option>
</select>


      {/* Payment */}
      <select
        value={filters.paymentMethods}
        onChange={(e) => update("paymentMethods", e.target.value)}
      >
        <option value="">Payment Method</option>
        <option>UPI</option>
        <option>Cash</option>
        <option>Card</option>
      </select>

            {/* Date Filter */}
    <select
        value={filters.date}
        onChange={(e) => update("date", e.target.value)}
      >
        <option value="">Date</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
        <option value="custom">Custom</option>
      </select>


      {/* Sort By */}
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
