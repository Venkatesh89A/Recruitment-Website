import { Link } from 'react-router-dom';

const typeClassMap = {
  'Full-time': 'text-bg-primary',
  'Part-time': 'text-bg-warning',
  Internship: 'text-bg-success',
};

function JobCard({ job }) {
  return (
    <article className="job-card card h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <p className="text-uppercase text-secondary small fw-semibold mb-1">{job.company}</p>
            <h3 className="h5 card-title mb-0">{job.title}</h3>
          </div>
          <span className={`badge rounded-pill ${typeClassMap[job.employmentType]}`}>
            {job.employmentType}
          </span>
        </div>

        <div className="job-meta vstack gap-2 mb-4">
          <span>{job.location}</span>
          <span>{job.category}</span>
          <span>{job.salary}</span>
          <span>Posted {new Date(job.postedDate).toLocaleDateString('en-IN')}</span>
        </div>

        <Link className="btn btn-outline-primary mt-auto" to={`/jobs/${job.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

export default JobCard;
