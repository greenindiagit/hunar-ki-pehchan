import { useEffect, useState } from "react";
import Button from "../../Component/common/Button";
import Loader from "../../Component/common/Loader";
import Modal from "../../Component/common/Modal";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Guest = () => {
  const navigate = useNavigate();
  const [guestImage, setGuestImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const [guestId, setGuestId] = useState(null);
  const [roles, setRoles] = useState([]);
  // ✅ IMAGE CHANGE

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGuestImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("role", role);
      formData.append("description", description);

      if (guestImage) {
        formData.append("image", guestImage);
      }

      let response;

      if (guestId) {
        response = await axios.put(
          `${apis.guests.update}/${guestId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          apis.guests.create,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        setShowModal(true);

        setTimeout(() => {
          navigate("/guest");
        }, 1000);
      }
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axios.get(apis.roles.get);
      if (res.data.success) {
        setRoles(res.data.data);
      }
    };

    fetchRoles();
  }, []);


  useEffect(() => {
    if (id) {
      fetchGuest();
    }
  }, [id]);

  const fetchGuest = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${apis.guests.get}/${id}`);

      const data = res?.data?.data;

      console.log("Image Path:", data.image);
      if (data) {
        setGuestId(data._id);
        setName(data.name || "");
        setRole(data.role || "");
        setDescription(data.description || "");

        if (data.image) {
          setPreview(`${BASE_URL}/${data.image}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <div className="page-header">
          <h2>{id ? "Update Guest" : "Create Guest"}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>

              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>

                {roles.map((r) => (
                  <option key={r._id} value={r.roleName}>
                    {r.roleName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />

              {preview && (
                <div className="col-md-6 mb-3">
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "100%",
                      maxWidth: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button type="submit" variant="primary">
              {id ? "Update" : "Save"}
            </Button>
          </div>
        </form>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Guest"
        >
          <p>
            {id
              ? "Guest updated successfully"
              : "Guest created successfully"}
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default Guest;
