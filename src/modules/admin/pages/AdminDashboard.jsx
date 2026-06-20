import { DataTable } from "../../../components/common/DataTable.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { StatusBadge } from "../../../components/common/StatusBadge.jsx";

export function AdminDashboard({ admin, applications, onNavigate }) {
  const maxOverview = Math.max(...admin.overview.map((item) => item.value), 1);
  const columns = [
    {
      key: "candidate",
      label: "Candidate",
      render: (row) => (
        <>
          <strong>{row.candidate}</strong>
          <span>{row.appliedDate}</span>
        </>
      ),
    },
    { key: "role", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "recruiter", label: "Recruiter" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Admin Dashboard"
        subtitle="Overview of recruitment activity, workload, and application pipeline."
        actions={<button className="primary-button" onClick={() => onNavigate("manage-applications")}>Manage Applications</button>}
      />

      <div className="stats-grid admin-stats">
        {admin.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="analytics-grid">
        <Panel title="Applications Overview" subtitle="Weekly application volume.">
          <div className="line-chart">
            {admin.overview.map((item) => (
              <div className="chart-column" key={item.label}>
                <span style={{ height: `${Math.max(10, (item.value / maxOverview) * 100)}%` }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Applications by Status" subtitle="Pipeline distribution.">
          <div className="status-overview">
            <div
              className="donut-chart"
              style={{ "--donut-colors": buildDonut(admin.statusBreakdown) }}
              aria-hidden="true"
            />
            <div className="status-legend">
              {admin.statusBreakdown.map((item) => (
                <article key={item.label}>
                  <span className={`legend-dot legend-${item.tone}`} />
                  <strong>{item.label}</strong>
                  <small>{item.value}</small>
                </article>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="two-column-grid">
        <Panel title="Recruiter Workload" subtitle="Active applications and pending reviews.">
          <div className="workload-list">
            {admin.workload.map((item) => (
              <article className="workload-card" key={item.recruiter}>
                <strong>{item.recruiter}</strong>
                <p>{item.active} active applications</p>
                <span>{item.pending} pending reviews</span>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Hiring Funnel" subtitle="Application flow by stage.">
          <div className="funnel-list">
            {admin.statusBreakdown.map((item) => (
              <article className="funnel-row" key={item.label}>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value} candidates</span>
                </div>
                <ProgressBar value={(item.value / 78) * 100} />
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent Applications" subtitle="Latest candidate records entering the recruitment flow.">
        <DataTable columns={columns} rows={applications.slice(0, 5)} />
      </Panel>
    </div>
  );
}

function buildDonut(items) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let start = 0;
  return items
    .map((item) => {
      const size = (item.value / total) * 100;
      const stop = `var(--${item.tone}) ${start}% ${start + size}%`;
      start += size;
      return stop;
    })
    .join(", ");
}
