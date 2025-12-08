// src/App.jsx
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MetricCards from "./components/MetricCards";
import FilterBar from "./components/FilterBar";
import SalesTable from "./components/SalesTable";
import { fetchSales } from "./services/api";
import "./styles/app.css";


export default function App() {
  const [filters, setFilters] = useState({
    page: 1,
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
    order: "asc",
  });

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      setLoading(true);
      const res = await fetchSales(filters);

      setData(res.data || []);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.totalCount || 0);
    } catch (err) {
      console.error("API error:", err);
      setData([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout filters={filters} setFilters={setFilters}>
      
      {/* STATIC (not scrolling) */}
      <div className="top-section">
        <FilterBar filters={filters} setFilters={setFilters} />
        <MetricCards data={data} totalCount={totalCount} />
      </div>

      {/* SCROLL ONLY TABLE */}
      <div className="table-section">
        <SalesTable
          loading={loading}
          data={data}
          filters={filters}
          setFilters={setFilters}
          totalPages={totalPages}
        />
      </div>

    </Layout>
  );
}
