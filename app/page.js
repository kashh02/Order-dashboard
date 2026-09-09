"use client";

import { useCallback, useEffect, useState } from "react";
import Filters from "@/components/Filters";
import SummaryCards from "@/components/SummaryCards";
import RevenueChart from "@/components/RevenueChart";
import StatusChart from "@/components/StatusChart";
import TopProducts from "@/components/TopProducts";

const EMPTY_FILTERS = {from: "", to: "", status: "all", category: "all"};

export default function DashboardPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [options, setOptions] = useState({ statuses: [], categories: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dateError =
  filters.from && filters.to && filters.from > filters.to
    ? "From date cannot be after To date."
    : "";

  
  useEffect(() => {
    fetch("/api/options")
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (result) setOptions(result);
      })
      .catch(() => {
        // The dashboard still works with "All" selected, so a failure here is not fatal.
      });
  }, []);

  const loadAnalytics = useCallback(async () => {
    if (dateError){
      setLoading(true);
      setError("");
      setData(null);
      return;

    }
    setLoading(true);
    setError("");
    

    try {
      const query = new URLSearchParams();
      if (filters.from) query.set("from", filters.from);
      if (filters.to) query.set("to", filters.to);
      if (filters.status !== "all") query.set("status", filters.status);
      if (filters.category !== "all") query.set("category", filters.category);

      const response = await fetch(`/api/analytics?${query.toString()}`);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setData(await response.json());
    } catch {
      setError("We could not load the dashboard data. Check the database connection and try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [filters, dateError]);

 
  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Orders dashboard</h1>
      </header>

      <Filters
        filters={filters}
        options={options}
        dateError={dateError}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      {dateError && (
        <p id="date-range-error" className="filter-error" role="alert">
          {dateError}
        </p>
      )}

      {loading && (
        <div className="skeleton-grid" aria-busy="true" aria-label="Loading dashboard">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton tall" />
        </div>
      )}

      {!loading && error && (
        <div className="state error" role="alert">
          <h2>Dashboard data unavailable</h2>
          <p>{error}</p>
          <button type="button" className="retry" onClick={loadAnalytics}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <SummaryCards
            totalOrders={data.totalOrders}
            totalRevenue={data.totalRevenue}
            ordersByStatus={data.ordersByStatus}
          />

          <RevenueChart data={data.revenueOverTime} />

          <div className="chart-grid">
            <StatusChart data={data.ordersByStatus} />
            <TopProducts data={data.topProducts} />
          </div>
        </>
      )}
    </main>
  );
}
