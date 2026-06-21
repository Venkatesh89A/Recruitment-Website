export function Panel({ title, subtitle, actions, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      {(title || subtitle || actions) && (
        <div className="panel-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="panel-actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
