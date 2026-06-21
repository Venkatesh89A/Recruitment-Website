import { Avatar } from "../../../components/common/Avatar.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";
import { StatusBadge } from "../../../components/common/StatusBadge.jsx";

export function CandidateDetailsPage({ candidates, applications, selectedCandidateId, onSelectCandidate }) {
  const candidate = candidates.find((item) => item.id === selectedCandidateId) || candidates[0];
  const candidateApplications = applications.filter((item) => item.candidateId === candidate.id);
  const primaryApplication = candidateApplications[0];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Candidate Review"
        title="Candidate Details"
        subtitle="Profile, resume, interview history, and application timeline."
        actions={
          <select value={candidate.id} onChange={(event) => onSelectCandidate(event.target.value)}>
            {candidates.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        }
      />

      <div className="candidate-layout">
        <aside className="profile-card">
          <Avatar name={candidate.name} size="lg" />
          <h3>{candidate.name}</h3>
          <p>{candidate.title}</p>
          <div className="score-card compact-score">
            <span>ATS score</span>
            <strong>{candidate.atsScore}/100</strong>
            <ProgressBar value={candidate.atsScore} />
          </div>
          <dl>
            <div><dt>Email</dt><dd>{candidate.email}</dd></div>
            <div><dt>Phone</dt><dd>{candidate.phone}</dd></div>
            <div><dt>Location</dt><dd>{candidate.location}</dd></div>
            <div><dt>Experience</dt><dd>{candidate.experience}</dd></div>
            <div><dt>Education</dt><dd>{candidate.education}</dd></div>
            <div><dt>Resume</dt><dd>{candidate.resume}</dd></div>
          </dl>
        </aside>

        <div className="page-stack">
          <Panel title="Application Summary" subtitle="Evaluation context for recruiters.">
            <div className="summary-grid">
              <article className="summary-card">
                <span className="mini-label">Current Stage</span>
                <strong>{primaryApplication?.stage || "No active application"}</strong>
                {primaryApplication && <StatusBadge status={primaryApplication.status} />}
              </article>
              <article className="summary-card">
                <span className="mini-label">Applications</span>
                <strong>{candidateApplications.length}</strong>
                <p>Active records connected to this candidate.</p>
              </article>
              <article className="summary-card">
                <span className="mini-label">Skills</span>
                <div className="skills-row">
                  {candidate.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            </div>
          </Panel>

          <Panel title="Timeline" subtitle="Recruitment steps and communication history.">
            <div className="timeline-list">
              {candidate.timeline.map((item) => (
                <article className="timeline-item" key={`${item.date}-${item.title}`}>
                  <span />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.date} | {item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
