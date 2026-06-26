import { useEffect, useMemo, useState } from 'react';
import FilterPanel from '../components/FilterPanel.jsx';
import JobCard from '../components/JobCard.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import jobsData from '../data/jobsData.js';

const JOBS_PER_PAGE = 6;

const defaultFilters = {
  location: 'all',
  category: 'all',
  employmentType: 'all',
  salaryRange: 'all',
};

function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  const filterOptions = useMemo(
    () => ({
      locations: [...new Set(jobsData.map((job) => job.location))].sort(),
      categories: [...new Set(jobsData.map((job) => job.category))].sort(),
      employmentTypes: [...new Set(jobsData.map((job) => job.employmentType))].sort(),
    }),
    [],
  );

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const [minSalary, maxSalary] =
      filters.salaryRange === 'all' ? [0, Number.MAX_SAFE_INTEGER] : filters.salaryRange.split('-').map(Number);

    // All search and filter rules live in one memoized pipeline so pagination always receives the same source.
    return jobsData.filter((job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.description,
        job.employmentType,
        ...job.requiredSkills,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = query === '' || searchableText.includes(query);
      const matchesLocation = filters.location === 'all' || job.location === filters.location;
      const matchesCategory = filters.category === 'all' || job.category === filters.category;
      const matchesEmployment =
        filters.employmentType === 'all' || job.employmentType === filters.employmentType;
      const matchesSalary = job.maxSalary >= minSalary && job.minSalary <= maxSalary;

      return matchesSearch && matchesLocation && matchesCategory && matchesEmployment && matchesSalary;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const firstJobIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(firstJobIndex, firstJobIndex + JOBS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const resetSearchAndFilters = () => {
    setSearchTerm('');
    setFilters(defaultFilters);
  };

  const summaryStats = [
    { label: 'Open Jobs', value: jobsData.length },
    { label: 'Locations', value: filterOptions.locations.length },
    { label: 'Categories', value: filterOptions.categories.length },
  ];

  return (
    <main className="portal-shell">
      <section className="listing-header border-bottom">
        <div className="container py-4 py-lg-5">
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <p className="text-uppercase text-primary fw-bold small mb-2">Job Portal</p>
              <h1 className="display-6 fw-bold mb-3">Find roles that match your next move</h1>
              <p className="lead text-secondary mb-0">
                Browse curated opportunities, filter quickly, and open detailed job information in one clean interface.
              </p>
              <div className="portal-stats d-flex flex-wrap gap-3 mt-4">
                {summaryStats.map((stat) => (
                  <div className="portal-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4 py-lg-5">
        <div className="row g-4">
          <div className="col-lg-3">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="col-lg-9">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h2 className="h4 mb-1">Available Jobs</h2>
                <p className="text-secondary mb-0">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="loading-state bg-white border rounded-3 text-center shadow-sm">
                <div className="spinner-border text-primary mb-3" role="status" aria-label="Loading jobs" />
                <p className="fw-semibold mb-0">Loading job listings...</p>
              </div>
            ) : paginatedJobs.length > 0 ? (
              <>
                <div className="row g-4">
                  {paginatedJobs.map((job) => (
                    <div className="col-md-6 col-xl-4" key={job.id}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              </>
            ) : (
              <div className="empty-state bg-white border rounded-3 text-center shadow-sm">
                <h3 className="h5 mb-2">No jobs found</h3>
                <p className="text-secondary mb-3">
                  Try a different keyword or remove a few filters to see more opportunities.
                </p>
                <button type="button" className="btn btn-primary" onClick={resetSearchAndFilters}>
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default JobListingPage;
