import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);

    // 🔹 Dummy Auth (Replace with API later)
    setTimeout(() => {
      if (form.email === "admin@gmail.com" && form.password === "123456") {
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("role", "admin");
        navigate("/");
      } else if (
        form.email === "subadmin@gmail.com" &&
        form.password === "123456"
      ) {
        localStorage.setItem("token", "subadmin-token");
        localStorage.setItem("role", "subadmin");
        navigate("/");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-login">
      <div className="card shadow-sm bg-dark-subtle" style={{ width: "360px" }}>
        <div className="card-body">
          <h4 className="text-center mb-4 fw-bold">
            GI TEAM
          </h4>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn bg-body w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-muted mt-3 small text-center">
            <div>Admin: admin@gmail.com / 123456</div>
            <div>Sub-Admin: subadmin@gmail.com / 123456</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
