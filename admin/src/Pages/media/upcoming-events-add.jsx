import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/common/Loader";
import apis, { BASE_URL } from "../../apis/apis";
import { State, City } from "country-state-city";
const EventCreate = () => {
  const navigate = useNavigate();
  const states = State.getStatesOfCountry("IN");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventTitle, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStatus, setEventStatus] = useState("Upcoming");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const isEdit = !!id;

  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      // console.log(setPreview);
    }
  };
  const handleStateChange = (e) => {
    const selectedStateCode = e.target.value;

    setState(selectedStateCode);
    setCity("");

    const cityList = City.getCitiesOfState("IN", selectedStateCode);
    setCities(cityList);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("eventTitle", eventTitle);
      formData.append("eventDate", eventDate);
      formData.append("eventDescription", eventDescription);
      formData.append("city", city);
      formData.append("state", state);
      formData.append(
        "eventStatus",
        isEdit ? eventStatus : "Upcoming"
      );
      let res;
      if (isEdit) {
        res = await axios.put(`${apis.event.update}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(apis.event.create, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (res.data.success) {
        navigate("/event-list");
      }
    } catch (error) {
      console.error("Episode save error:", error);
    } finally {
      setLoading(false);
    }
  };
  // Load episode in edit mode
  const getEventComingById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apis.event.get}/${id}`);
      const data = res.data.data;

      setTitle(data?.eventTitle || "");
      setEventDate(data?.eventDate?.split("T")[0] || "");
      setEventDescription(data?.eventDescription || "");

      setState(data?.state || "");
      setCity(data?.city || "");

      if (data?.state) {
        const cityList = City.getCitiesOfState("IN", data.state);
        setCities(cityList);
      }

      setEventStatus(data?.eventStatus || "Upcoming");

      if (data?.image) {
        setPreview(`${BASE_URL}/${data.image}`);
      }
      // console.log("IMAGE", data.image);

    } catch (error) {
      console.error("Get Episode Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      await getEventComingById();
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <h3>{isEdit ? "Edit Upcoming Event" : "Add Upcoming Event"}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          {/* TITLE */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Event Title</label>
              <input
                type="text"
                className="form-control"
                value={eventTitle}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Event Date</label>
              <input
                type="date"
                className="form-control"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </div>
          {/* GUEST + DURATION */}
          <div className="row">
            {/* State Dropdown */}
            <div className={isEdit ? "col-md-4 mb-3" : "col-md-6 mb-3"}>
              <label>State</label>
              <select
                className="form-control"
                value={state}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>

                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className={isEdit ? "col-md-4 mb-3" : "col-md-6 mb-3"}>
              <label>City</label>
              <select
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
              >
                <option value="">Select City</option>

                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {isEdit && (
              <div className="col-md-4 mb-3">
                <label>Status</label>
                <select
                  className="form-control"
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>
          <div className="row">
            {/* DESCRIPTION */}
            <div className="col-md-6 mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            {/* IMAGE */}
            <div className="col-md-4 mb-3">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required={!isEdit}
              />
            </div>
            <div className="col-md-2 mb-3">
              {preview && (
                <div className="col-md-6 mb-3">
                  <img
                    src={preview}
                    alt="preview"
                    onError={(e) => {
                      console.log("Image Error:", e.target.src);
                    }}
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

          {/* BUTTON */}
          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/event-list")}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary ">
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
