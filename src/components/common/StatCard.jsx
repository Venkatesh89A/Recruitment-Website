import { Icon } from "./Icon.jsx";

export function StatCard({ label, value, note, tone = "blue" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span className="stat-icon">
        <Icon name="briefcase" />
      </span>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}
