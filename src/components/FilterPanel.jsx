const salaryRanges = [
  { label: 'Any salary', value: 'all' },
  { label: 'Up to ₹5 LPA', value: '0-500000' },
  { label: '₹5 LPA - ₹10 LPA', value: '500000-1000000' },
  { label: '₹10 LPA - ₹15 LPA', value: '1000000-1500000' },
  { label: 'Above ₹15 LPA', value: '1500000-99999999' },
];

function FilterPanel({ filters, filterOptions, onFilterChange, onClearFilters }) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== 'all');

  return (
    <aside className="filter-panel bg-white border rounded-3 shadow-sm">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <h2 className="h5 mb-0">Filters</h2>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear
        </button>
      </div>

      <div className="vstack gap-3">
        <div>
          <label className="form-label fw-semibold" htmlFor="location-filter">
            Location
          </label>
          <select
            id="location-filter"
            className="form-select"
            value={filters.location}
            onChange={(event) => onFilterChange('location', event.target.value)}
          >
            <option value="all">All locations</option>
            {filterOptions.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label fw-semibold" htmlFor="category-filter">
            Category
          </label>
          <select
            id="category-filter"
            className="form-select"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
          >
            <option value="all">All categories</option>
            {filterOptions.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label fw-semibold" htmlFor="employment-filter">
            Employment Type
          </label>
          <select
            id="employment-filter"
            className="form-select"
            value={filters.employmentType}
            onChange={(event) => onFilterChange('employmentType', event.target.value)}
          >
            <option value="all">All types</option>
            {filterOptions.employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label fw-semibold" htmlFor="salary-filter">
            Salary Range
          </label>
          <select
            id="salary-filter"
            className="form-select"
            value={filters.salaryRange}
            onChange={(event) => onFilterChange('salaryRange', event.target.value)}
          >
            {salaryRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}

export default FilterPanel;
