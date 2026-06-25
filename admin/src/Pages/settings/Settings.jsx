import { useState } from "react";
import Button from "../../Component/common/Button";

const Settings = () => {
  const role = localStorage.getItem("role") || "Admin";

  const [settings, setSettings] = useState({
    companyName: "ABC Technologies Pvt Ltd",
    workingHours: "9:00 AM - 6:00 PM",
    leaveApproval: "Admin",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings saved successfully ✅");
    // 🔜 API integration here
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <div className="card-body">
          <h4 className="fw-bold mb-4">System Settings</h4>

          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              value={settings.companyName}
              onChange={handleChange}
              disabled={role !== "Admin"}
            />
          </div>

          {/* Working Hours */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Working Hours</label>
            <input
              type="text"
              name="workingHours"
              className="form-control"
              value={settings.workingHours}
              onChange={handleChange}
            />
          </div>

          {/* Leave Approval Authority */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Leave Approval Authority
            </label>
            <select
              name="leaveApproval"
              className="form-select"
              value={settings.leaveApproval}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Sub-Admin">Sub-Admin</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            <label className="form-check-label fw-semibold">
              Enable Notifications
            </label>
          </div>

          {/* Save Button */}
          <div className="text-end">
            <Button variant="primary" onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
