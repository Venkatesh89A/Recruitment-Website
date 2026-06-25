import { Avatar } from "../../../components/common/Avatar.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";

export function ProfilePage({ applicant, resume, onNavigate, onResumeUpload, onToast }) {
  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (file) onResumeUpload(file);
  }

  function handleProfileSave(event) {
    event.preventDefault();
    onToast?.({
      title: "Profile Updated",
      message: "Your recruiter-facing profile changes were saved.",
    });
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Profile Page"
        title="Candidate Profile"
        subtitle="Personal details, skills, resume readiness, and recruiter-facing information."
        actions={
          <button className="outline-button" type="button" onClick={() => onNavigate("resume-upload")}>
            Resume Upload
          </button>
        }
      />

      <div className="profile-layout">
        <aside className="profile-card">
          <Avatar name={applicant.name} size="lg" />
          <h3>{applicant.name}</h3>
          <p>{applicant.role}</p>
          <div className="score-card compact-score">
            <span>Resume score</span>
            <strong>{resume.atsScore}/100</strong>
            <ProgressBar value={resume.atsScore} />
          </div>
          <dl>
            <div><dt>Email</dt><dd>{applicant.email}</dd></div>
            <div><dt>Phone</dt><dd>{applicant.phone}</dd></div>
            <div><dt>Location</dt><dd>{applicant.location}</dd></div>
            <div><dt>Availability</dt><dd>{applicant.availability}</dd></div>
          </dl>
        </aside>

        <div className="page-stack">
          <Panel title="Personal Information" subtitle="Keep this information accurate for recruiters.">
            <form className="form-grid" onSubmit={handleProfileSave}>
              <label>
                <span>Full Name</span>
                <input defaultValue={applicant.name} />
              </label>
              <label>
                <span>Professional Title</span>
                <input defaultValue={applicant.role} />
              </label>
              <label>
                <span>Email</span>
                <input type="email" defaultValue={applicant.email} />
              </label>
              <label>
                <span>Phone</span>
                <input defaultValue={applicant.phone} />
              </label>
              <label>
                <span>Preferred Location</span>
                <input defaultValue={applicant.location} />
              </label>
              <label>
                <span>Experience</span>
                <input defaultValue={applicant.experience} />
              </label>
              <div className="form-actions">
                <button className="primary-button" type="submit">Save Changes</button>
              </div>
            </form>
          </Panel>

          <Panel title="Skills" subtitle="Recruiter-facing strengths and role keywords.">
            <div className="skills-row">
              {applicant.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </Panel>

          <Panel title="Resume Center" subtitle="Upload, validate, and keep the active resume ready for recruiters.">
            <div className="resume-feature">
              <div className="resume-file-icon">PDF</div>
              <div>
                <span className="mini-label">Current resume</span>
                <h3>{resume.fileName}</h3>
                <p>Uploaded on {resume.uploadedAt} | {resume.size} | {resume.format}</p>
                <div className="score-card compact-score">
                  <span>ATS score</span>
                  <strong>{resume.atsScore}/100</strong>
                  <ProgressBar value={resume.atsScore} />
                </div>
              </div>
              <div className="resume-actions">
                <label className="file-button">
                  Add Resume
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
                </label>
                <button className="outline-button" type="button" onClick={() => onNavigate("resume-upload")}>
                  Open Resume Page
                </button>
              </div>
            </div>

            <div className="resume-checklist">
              {resume.checklist.map((item) => (
                <article className={`checklist-item ${item.complete ? "complete" : ""}`} key={item.label}>
                  <span>{item.complete ? "OK" : "!"}</span>
                  <strong>{item.label}</strong>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
