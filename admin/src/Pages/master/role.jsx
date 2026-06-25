import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Component/common/Loader";
import apis from "../../apis/apis";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [mode, setMode] = useState("list"); // 👈 important
  const [loading, setLoading] = useState(false);

  // GET ROLES
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apis.roles.get);
      setRoles(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${apis.roles.update}/${editingId}`, {
        roleName,
      });
    } else {
      await axios.post(apis.roles.create, {
        roleName,
      });
    }

    setRoleName("");
    setEditingId(null);
    setMode("list");
    fetchRoles();
  };

  // ADD MODE
  const handleAdd = () => {
    setRoleName("");
    setEditingId(null);
    setMode("form");
  };

  // EDIT MODE
  const handleEdit = (role) => {
    setRoleName(role.roleName);
    setEditingId(role._id);
    setMode("form");
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${apis.roles.delete}/${id}`);
    fetchRoles();
  };

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h3>Role Management</h3>

          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Role
          </button>
        </div>

        {/* 🔥 FORM (ADD / EDIT MODE) */}
        {mode === "form" && (
          <div className="card p-3 mb-4 shadow-sm">
            <h5>{editingId ? "Edit Role" : "Add Role"}</h5>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
              />

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setMode("list")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 🔥 LIST TABLE */}
        {mode === "list" && (
          <div className="card shadow-sm">


            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="card-header fw-bold">
                  <tr>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role._id}>
                      <td>{index + 1}</td>
                      <td>{role.roleName}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-light rounded-circle"
                            onClick={() =>
                              handleEdit(
                                role
                              )
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-light rounded-circle"
                            onClick={() =>
                              handleDelete(
                                role._id
                              )
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePage;


