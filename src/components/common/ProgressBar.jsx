export function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="progress-track" aria-label={`${safeValue}%`}>
      <span style={{ width: `${safeValue}%` }} />
    </div>
  );
}
