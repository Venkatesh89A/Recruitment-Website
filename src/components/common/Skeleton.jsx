export function DashboardSkeleton() {
  return (
    <div className="page-stack" aria-label="Loading dashboard">
      <div className="loading-heading">
        <span className="loading-spinner" />
        <div className="skeleton skeleton-heading" />
      </div>
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
      <div className="skeleton-layout">
        <div className="skeleton skeleton-panel" />
        <div className="skeleton skeleton-panel small" />
      </div>
    </div>
  );
}
