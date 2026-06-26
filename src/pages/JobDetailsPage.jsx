import { Link, useNavigate, useParams } from 'react-router-dom';
import jobsData from '../data/jobsData.js';

function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find((item) => item.id === Number(jobId));

  if (!job) {
    return (
      <main className="container py-5">
        <div className="empty-state bg-white border rounded-3 text-center shadow-sm">
          <h1 className="h4 mb-2">Job not found</h1>
          <p className="text-secondary mb-3">The job listing may have been removed or the link is incorrect.</p>
          <Link className="btn btn-primary" to="/jobs">
            Back to Jobs
          </Link>
        </div>
      </main>
    );
  }

  const formattedPostedDate = new Date(job.postedDate).toLocaleDateString('en-IN');

  return (
    <main className="portal-shell">
      <section className="details-header border-bottom">
        <div className="container py-4 py-lg-5">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {job.title}
              </li>
            </ol>
          </nav>

          <div className="row align-items-end g-4">
            <div className="col-lg-8">
              <p className="text-uppercase text-primary fw-bold small mb-2">{job.company}</p>
              <h1 className="display-6 fw-bold mb-3">{job.title}</h1>
              <div className="details-meta d-flex flex-wrap gap-2">
                <span className="badge text-bg-light border">{job.location}</span>
                <span className="badge text-bg-light border">{job.category}</span>
                <span className="badge text-bg-light border">{job.employmentType}</span>
                <span className="badge text-bg-light border">{job.salary}</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2">
                <button type="button" className="btn btn-primary btn-lg">
                  Apply Now
                </button>
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/jobs')}>
                  Back to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4 py-lg-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <article className="details-card bg-white border rounded-3 shadow-sm">
              <h2 className="h4 mb-3">Job Description</h2>
              <p className="text-secondary mb-4">{job.description}</p>

              <h2 className="h4 mb-3">Required Skills</h2>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {job.requiredSkills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <h2 className="h4 mb-3">Experience Required</h2>
              <p className="text-secondary mb-0">{job.experience}</p>
            </article>
          </div>

          <div className="col-lg-4">
            <aside className="details-card bg-white border rounded-3 shadow-sm">
              <h2 className="h5 mb-3">Job Information</h2>
              <dl className="job-info-list mb-0">
                <div>
                  <dt>Company</dt>
                  <dd>{job.company}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
                <div>
                  <dt>Salary</dt>
                  <dd>{job.salary}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{job.category}</dd>
                </div>
                <div>
                  <dt>Experience Required</dt>
                  <dd>{job.experience}</dd>
                </div>
                <div>
                  <dt>Posted Date</dt>
                  <dd>{formattedPostedDate}</dd>
                </div>
              </dl>
            </aside>

            <aside className="details-card bg-white border rounded-3 shadow-sm mt-4">
              <h2 className="h5 mb-3">Role Summary</h2>
              <p className="text-secondary mb-3">
                {job.company} is hiring for a {job.employmentType.toLowerCase()} role in {job.location}.
              </p>
              <Link className="btn btn-outline-primary w-100" to="/jobs">
                View More Jobs
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JobDetailsPage;
