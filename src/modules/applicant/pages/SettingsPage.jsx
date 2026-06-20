import { PageHeader } from "../../../components/common/PageHeader.jsx";
import { Panel } from "../../../components/common/Panel.jsx";

export function SettingsPage({ applicant, onToast }) {
  function handleSettingsSave(event) {
    event.preventDefault();
    onToast?.({
      title: "Settings Saved",
      message: "Notification and job search preferences were updated.",
    });
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Settings Page"
        title="Account Settings"
        subtitle="Notification preferences, privacy, and job search defaults."
        actions={<button className="primary-button" type="button" onClick={handleSettingsSave}>Save Settings</button>}
      />

      <form className="settings-grid" onSubmit={handleSettingsSave}>
        <Panel title="Notifications" subtitle="Control updates from recruiters and the portal.">
          <div className="setting-list">
            <label><input type="checkbox" defaultChecked={applicant.settings.emailAlerts} /> Email alerts</label>
            <label><input type="checkbox" defaultChecked={applicant.settings.recruiterMessages} /> Recruiter messages</label>
            <label><input type="checkbox" defaultChecked={applicant.settings.weeklyDigest} /> Weekly digest</label>
          </div>
        </Panel>

        <Panel title="Preferences" subtitle="Default values used in recommendations.">
          <div className="form-grid one-column">
            <label>
              <span>Profile Visibility</span>
              <select defaultValue={applicant.settings.profileVisibility}>
                <option>Recruiters only</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </label>
            <label>
              <span>Preferred Role</span>
              <input defaultValue={applicant.settings.preferredRole} />
            </label>
            <label>
              <span>Preferred Location</span>
              <input defaultValue={applicant.settings.preferredLocation} />
            </label>
            <button className="primary-button" type="submit">Save Preferences</button>
          </div>
        </Panel>
      </form>
    </div>
  );
}
