function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-panel bg-white border rounded-3 shadow-sm">
      <label htmlFor="job-search" className="form-label fw-semibold">
        Search Jobs
      </label>
      <input
        id="job-search"
        type="search"
        className="form-control form-control-lg"
        placeholder="Search by title, company, keyword, or location"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
