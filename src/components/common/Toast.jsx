export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type || "success"}`} role="status" aria-live="polite">
      <div>
        <strong>{toast.title}</strong>
        {toast.message && <p>{toast.message}</p>}
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        Close
      </button>
    </div>
  );
}
