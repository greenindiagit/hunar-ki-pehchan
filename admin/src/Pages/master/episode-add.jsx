import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/common/Loader";
import apis, { BASE_URL } from "../../apis/apis";

const EpisodeCreate = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [guestName, setGuestName] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState(0);
  const [isPopular, setIsPopular] = useState(true);
  const [status, setStatus] = useState(true);
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const isEdit = !!id;
  // IMAGE HANDLE
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      if (image) {
        formData.append("image", image);
      }
      formData.append("videoUrl", videoUrl);
      formData.append("description", description);
      formData.append("guestName", guestName);
      formData.append("duration", duration);
      formData.append("views", views);
      formData.append("isPopular", isPopular);
      formData.append("status", status);

      let res;

      if (isEdit) {
        res = await axios.put(`${apis.episodes.update}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(apis.episodes.create, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("API RESPONSE:", res.data);

      if (res.data.success) {
        navigate("/episodes");
      }
    } catch (error) {
      console.error("Episode save error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load episode in edit mode
  useEffect(() => {
    if (isEdit) {
      getEpisodeById();
    }
  }, [id]);

  const getEpisodeById = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${apis.episodes.update}/${id}`);

      console.log("GET RESPONSE:", res.data);

      // API response ke hisab se yahan adjust kar sakte ho
      const data = res.data.data || res.data.episode || res.data;

      setTitle(data?.title || "");
      setVideoUrl(data?.videoUrl || "");
      setDescription(data?.description || "");
      setGuestName(data?.guestName || "");
      setDuration(data?.duration || "");
      setViews(data?.views || 0);
      setIsPopular(data?.isPopular ?? true);
      setStatus(data?.status ?? true);
       setPreview(`${BASE_URL}/${data.image}`);
    } catch (error) {
      console.error("Get Episode Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
     <div className="page-wrapper">
      <div className="container mt-4 mb-2">
      <h3>{isEdit ? "Edit Episode" : "Add Episode"}</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* TITLE */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Guest Name</label>
            <input
              type="text"
              className="form-control"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
        </div>
        {/* GUEST + DURATION */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Video URL</label>
            <input
              type="text"
              className="form-control"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Duration</label>
            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45 min"
            />
          </div>
        </div>

        {/* VIEWS + FLAGS */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Views</label>
            <input
              type="number"
              className="form-control"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Is Popular</label>
            <select
              className="form-control"
              value={isPopular}
              onChange={(e) => setIsPopular(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Status</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div className="row">
          {/* DESCRIPTION */}
          <div className="col-md-6 mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* IMAGE */}
          <div className="col-md-4 mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImage}
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            {preview && (
              <div className="mt-2">
                <img
                  className="img-thumbnail"
                  src={preview}
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/episode-list")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update Episode" : "Save Episode"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EpisodeCreate;
