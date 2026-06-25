import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { StatusBadge } from "../../../components/common/StatusBadge.jsx";

export function ApplicantDashboard({ applicant, applications, onNavigate }) {
  const candidateApplications = applications.filter((application) => application.candidateId === applicant.id);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Applicant Dashboard"
        title={applicant.headline}
        subtitle={applicant.summary}
        actions={<button className="primary-button" onClick={() => onNavigate("application-status")}>View Status</button>}
      />

      <section className="hero-panel">
        <div>
          <span className="mini-label">Candidate overview</span>
          <h2>{applicant.role}</h2>
          <p>{applicant.location} | {applicant.experience} experience | {applicant.availability} availability</p>
          <div className="inline-actions">
            <button className="primary-button" onClick={() => onNavigate("profile")}>Update Profile</button>
            <button className="outline-button" onClick={() => onNavigate("resume-upload")}>Upload Resume</button>
            <button className="outline-button" onClick={() => onNavigate("manage-applications")}>Manage Applications</button>
          </div>
        </div>
        <div className="score-card">
          <span>Profile completion</span>
          <strong>{applicant.profileScore}%</strong>
          <ProgressBar value={applicant.profileScore} />
        </div>
      </section>

      <div className="stats-grid">
        {applicant.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="two-column-grid">
        <Panel title="Recent Applications" subtitle="Current movement across your job pipeline.">
          <div className="timeline-list">
            {candidateApplications.map((application) => (
              <article className="timeline-item" key={application.id}>
                <span />
                <div>
                  <strong>{application.company} - {application.role}</strong>
                  <p>{application.stage} | Updated {application.lastUpdate}</p>
                  <StatusBadge status={application.status} />
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Upcoming Actions" subtitle="Recommended actions for this week.">
          <div className="task-list">
            {applicant.tasks.map((task) => (
              <article className="task-card" key={task.title}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.due}</p>
                </div>
                <span className="priority-pill">{task.priority}</span>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
