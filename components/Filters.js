"use client";

export default function Filters({ filters, options, dateError, onChange, onReset }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters">
      <div className="field">
        <label htmlFor="from">From date</label>
        <input
          id="from"
          type="date"
          value={filters.from}
          max={filters.to || undefined}
          aria-invalid={Boolean(dateError)}
          aria-describedby={dateError ? "date-range-error" : undefined}
          onChange={(event) => update("from", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="to">To date</label>
        <input
          id="to"
          type="date"
          value={filters.to}
          min={filters.from || undefined}
          aria-invalid={Boolean(dateError)}
          aria-describedby={dateError ? "date-range-error" : undefined}
          onChange={(event) => update("to", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(event) => update("status", event.target.value)}
        >
          <option value="all">All statuses</option>
          {options.statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(event) => update("category", event.target.value)}
        >
          <option value="all">All categories</option>
          {options.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="reset" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}
