import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const role = localStorage.getItem("role") || "Admin";

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/employees":
        return "Employees";
      case "/attendance":
        return "Attendance";
      case "/leave":
        return "Leave Management";
      case "/payroll":
        return "Payroll";
      case "/performance":
        return "Performance";
      case "/settings":
        return "Settings";
      default:
        return "Admin Panel";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm sticky-top px-3">
      <div className="container-fluid">
        {/* Mobile Menu Button */}
        <button
          className="btn btn-outline-light d-lg-none me-2"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <span className="navbar-brand mb-0 h5">
          {getPageTitle()}
        </span>

        <div className="ms-auto position-relative">
          <button
            className="btn btn-light rounded-pill px-4"
            onClick={() => setShowProfile(!showProfile)}
          >
            {role}
          </button>

          {showProfile && (
            <div
              className="dropdown-menu dropdown-menu-end show shadow border-0"
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                minWidth: "220px",
                zIndex: 1050,
              }}
            >
              <div className="px-3 py-2">
                <strong>{role}</strong>
              </div>

              <hr className="my-1" />

              <button
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </button>

              <button
                className="dropdown-item"
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </button>

              <hr className="my-1" />

              <button
                className="dropdown-item text-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
