import { useState } from "react";
import { Icon } from "../../../components/common/Icon.jsx";
import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";
import { ProgressBar } from "../../../components/common/ProgressBar.jsx";

export function ResumeUploadPage({ applicant, resume, onResumeUpload, onToast }) {
  const [dragActive, setDragActive] = useState(false);

  function handleFile(file) {
    if (!file) return;
    onResumeUpload(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleBrowse(event) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  const resumeHealth = [
    { label: "ATS score", value: `${resume.atsScore}/100` },
    { label: "Format", value: resume.format },
    { label: "Last upload", value: resume.uploadedAt },
  ];
  const history = resume.history?.length
    ? resume.history
    : [{ fileName: resume.fileName, uploadedAt: resume.uploadedAt, status: "Uploaded" }];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Resume Upload"
        title="Resume Center"
        subtitle="Upload the latest resume, check readiness, and keep recruiter-facing documents clean."
        actions={
          <button
            className="outline-button"
            type="button"
            onClick={() =>
              onToast?.({
                title: "Preview ready",
                message: `${resume.fileName} is ready to connect with the document viewer.`,
              })
            }
          >
            View Resume
          </button>
        }
      />

      <div className="resume-upload-layout">
        <Panel title="Upload New Resume" subtitle="PDF, DOC, or DOCX only. Maximum file size is 5MB.">
          <label
            className={`resume-dropzone ${dragActive ? "active" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <span className="upload-ring">
              <Icon name="upload" />
            </span>
            <strong>Drop your resume here</strong>
            <p>Choose a focused, role-ready resume for faster screening.</p>
            <span className="primary-button">Browse File</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleBrowse} />
          </label>

          <div className="upload-requirements">
            <article>
              <strong>Accepted formats</strong>
              <span>PDF, DOC, DOCX</span>
            </article>
            <article>
              <strong>Maximum size</strong>
              <span>5MB</span>
            </article>
            <article>
              <strong>Recommended name</strong>
              <span>AmulyaThanda_Resume.pdf</span>
            </article>
          </div>

          <div className="resume-success-card">
            <span>Success State</span>
            <strong>Resume Uploaded Successfully</strong>
            <p>The active resume is ready for applications, recruiter review, and ATS screening.</p>
          </div>
        </Panel>

        <aside className="page-stack">
          <Panel title="Resume Preview" subtitle="Active document shared with recruiters.">
            <div className="resume-summary-card">
              <div className="resume-file-icon">
                <Icon name="file" />
              </div>
              <div>
                <strong>{resume.fileName}</strong>
                <span>{resume.size} | Uploaded on {resume.uploadedAt}</span>
              </div>
            </div>
            <div className="score-card compact-score">
              <span>Resume readiness</span>
              <strong>{resume.atsScore}%</strong>
              <ProgressBar value={resume.atsScore} />
            </div>
          </Panel>

          <Panel title="Resume Health" subtitle="Quick checks before applying.">
            <div className="resume-metric-grid">
              {resumeHealth.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Upload History" subtitle="Recent resume versions.">
            <div className="upload-history">
              {history.map((item, index) => (
                <article key={`${item.fileName}-${item.uploadedAt}-${index}`}>
                  <span className="history-dot" />
                  <div>
                    <strong>{item.fileName}</strong>
                    <p>{item.uploadedAt} | {item.status}</p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </aside>
      </div>

      <Panel title="Readiness Checklist" subtitle={`Checks for ${applicant.role} applications.`}>
        <div className="resume-version-list">
          {resume.checklist.map((item) => (
            <article className={`checklist-item ${item.complete ? "complete" : ""}`} key={item.label}>
              <span>{item.complete ? "OK" : "!"}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.complete ? "Ready for recruiter review." : "Recommended before sending new applications."}</p>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
