import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/common/Loader";
import apis, { BASE_URL } from "../../apis/apis";

const EventList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(apis.event.get);

      if (res.data.success) {
        setEvents(res.data.data || []);
      }
    } catch (error) {
      console.error("Fetch Events Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${apis.events.delete}/${id}`);

      if (res.data.success) {
        fetchEvents();
      }
    } catch (error) {
      console.error("Delete Event Error:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Event List</h3>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/event-add")}
          >
            Add Event
          </button>
        </div>

        <div className="card">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {events.length > 0 ? (
                  events.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        {item.image && (
                          <img
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.eventTitle}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        )}
                      </td>
                      <td>{item.eventTitle}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>
                        {item.eventDate
                          ? new Date(item.eventDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <span
                          className=   {`badge fs-6 ${item.eventStatus === "Upcoming"
                            ? "text-primary"
                            : item.eventStatus === "Ongoing"
                              ? "text-warning text-dark"
                              : item.eventStatus === "Completed"
                                ? "text-success"
                                : "text-danger"
                            }`} fs-4
                        >
                          {item.eventStatus}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex gap-2">
                          <button
                           className="btn btn-light rounded-circle"
                            onClick={() =>
                              navigate(`/event-edit/${item._id}`)
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            className="btn btn-light rounded-circle"
                            onClick={() => handleDelete(item._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Events Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;