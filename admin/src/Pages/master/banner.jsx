import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Component/common/Button";
import Loader from "../../Component/common/Loader";
import Modal from "../../Component/common/Modal";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";

const BannerCreate = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;
  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit && !bannerImage) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);

      if (bannerImage) {
        formData.append("image", bannerImage);
      }

      let response;

      if (isEdit) {
        response = await axios.put(
          `${apis.banners.update}/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          apis.banners.create,
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
          navigate("/banner-list");
        }, 1000);
      }
    } catch (error) {
      console.error("UPLOAD ERROR:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const getBannerById = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${apis.banners.update}/${id}`
      );

      if (response.data.success) {
        const banner = response.data.data;

        setName(banner.name || "");
        setType(banner.type || "");
        setPreview(`${BASE_URL}/${banner.image}`);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBannerById();
    }
  }, [id]);




  if (loading) return <Loader />;

  return (

     <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <div className="page-header">
          <h2>{isEdit ? "Update Banner" : "Create Banner"}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Banner Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter banner name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Banner Type</label>
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter banner type"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Banner Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>

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
          <div className="d-flex justify-content-start justify-content-md-start gap-2">
            <Button type="submit">
              {isEdit ? "Update" : "Save"}
            </Button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/banner-list")}
            >
              Back
            </button>
          </div>
        </form>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Banner"
        >
          <p>
            {isEdit
              ? "Banner updated successfully"
              : "Banner uploaded successfully"}
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default BannerCreate;
