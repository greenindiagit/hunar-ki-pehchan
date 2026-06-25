import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { MapPin } from "lucide-react";

import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";
function CompletedEvents() {


  
  const [completeEvent, setCompleteEvent] = useState([]);
  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const res = await axios.get(apis.event.get);

        if (res.data.success) {
          const completeEvent = res.data.data.filter(
            (event) => event.eventStatus === "Completed"
          );

          setCompleteEvent(completeEvent);
        }
      } catch (error) {
        console.error("upcoming  fetch error:", error);
      }
    };

    fetchUpcomingEvent();
  }, []);
  return (
    <>
      {/* HEADER */}
      <Header />

      <section className="photo-gallery-header">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-5">
            <h6 className="fw-bold ">Completed Events</h6>
          </div>

          {/* Events */}
          <div className="row g-4">
            {completeEvent.map((event, index) => (
              <div className="col-12 col-md-6 col-lg-3" key={index}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  {/* Image */}
                  <img
                  src={`${BASE_URL}/${event.image}`}
                    alt={event.title}
                    className="card-img-top"
                    style={{
                      height: "230px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Content */}
                  <div className="card-body d-flex flex-column">
                    <div className="text-center">
                      <span
                        className="badge mb-3 d-inline-flex align-items-center"
                        style={{
                          backgroundColor: "#198754",
                          color: "#fefefe",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          width: "fit-content",
                          fontWeight: "600",
                        }}
                      >
                         {new Date(event.eventDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h6 className="fw-bold">{event.eventTitle}</h6>

                    <p className="text-muted small mb-2 d-flex align-items-center gap-1">
                      <MapPin size={14} color="#0f7b53" />
                      {event.city}
                    </p>

                    <p className="text-muted small">{event.eventDescription}</p>

                    <button className="btn btn-outline-success mt-auto rounded-pill">
                      View Highlights
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default CompletedEvents;
