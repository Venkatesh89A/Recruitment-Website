import { useMemo, useState } from "react";
import { DataTable } from "../../../components/common/DataTable.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";
import { StatusBadge } from "../../../components/common/StatusBadge.jsx";

export function ManageApplicationsPage({ applications, onViewCandidate, onAdvanceStatus }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const haystack = [
        application.candidate,
        application.role,
        application.company,
        application.recruiter,
        application.status,
        application.stage,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query.toLowerCase()) && (status === "all" || application.status === status);
    });
  }, [applications, query, status]);

  const columns = [
    {
      key: "candidate",
      label: "Candidate",
      render: (row) => (
        <>
          <strong>{row.candidate}</strong>
          <span>{row.email}</span>
        </>
      ),
    },
    {
      key: "role",
      label: "Job Title",
      render: (row) => (
        <>
          <strong>{row.role}</strong>
          <span>{row.company}</span>
        </>
      ),
    },
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
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="row-actions">
          <button className="outline-button compact" onClick={() => onViewCandidate(row.candidateId)}>View</button>
          <button className="primary-button compact" onClick={() => onAdvanceStatus(row.id)}>Advance</button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Applications"
        title="Manage Applications"
        subtitle="Review, filter, and update candidate application stages."
      />

      <Panel>
        <div className="table-toolbar">
          <div className="filters">
            <label className="search-field">
              <span>Search</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Candidate, job, recruiter..." />
            </label>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <span>{filteredApplications.length} results</span>
        </div>
        <DataTable
          columns={columns}
          rows={filteredApplications}
          emptyMessage="No applications match the current search or status filter."
          emptyAction={
            <button
              className="outline-button compact"
              type="button"
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              Reset Filters
            </button>
          }
        />
        <div className="pagination-row">
          <span>Showing {filteredApplications.length ? 1 : 0} to {filteredApplications.length} of {filteredApplications.length} results</span>
          <div className="pagination-actions">
            <button className="outline-button compact" type="button" disabled>Previous</button>
            <button className="primary-button compact" type="button">1</button>
            <button className="outline-button compact" type="button" disabled>Next</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
