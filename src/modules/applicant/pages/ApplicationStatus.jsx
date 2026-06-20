import { DataTable } from "../../../components/common/DataTable.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";
import { StatusBadge } from "../../../components/common/StatusBadge.jsx";

export function ApplicationStatus({ applicant, applications }) {
  const rows = applications.filter((application) => application.candidateId === applicant.id);

  const columns = [
    {
      key: "role",
      label: "Job",
      render: (row) => (
        <>
          <strong>{row.role}</strong>
          <span>{row.company}</span>
        </>
      ),
    },
    { key: "stage", label: "Stage" },
    { key: "recruiter", label: "Recruiter" },
    {
      key: "match",
      label: "Match",
      render: (row) => (
        <div className="match-cell">
          <strong>{row.match}%</strong>
          <ProgressBar value={row.match} />
        </div>
      ),
    },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "lastUpdate", label: "Last Update" },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Application Status"
        title="Application Status"
        subtitle="Track where each application stands and what needs attention."
      />
      <Panel title="My Applications" subtitle="Status updates from connected dashboard APIs.">
        <DataTable columns={columns} rows={rows} />
      </Panel>
    </div>
  );
}
