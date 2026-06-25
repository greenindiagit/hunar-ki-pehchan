import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";


function Guests() {

const [guests, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(apis.guests.get);
    

        if (res.data.success) {
          setBanners(res.data.data);
        }
      } catch (error) {
        console.error("guests fetch error:", error);
      }
    };

    fetchBanners();
  }, []);
  return (
    <section className="py-2">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h5 className="fw-bold">Our Guests</h5>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {guests.map((guest, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
                {/* IMAGE */}
                <img
                src={`${BASE_URL}/${guest.image}`}
                  alt={guest.name}
                  className="card-img-top"
                />

                {/* CONTENT */}
                <div className="card-body text-center p-4">
                  <div>
                    <h6 className="fw-bold d-inline-block bg-warning text-white px-3 py-2 rounded fs-6">
                      {guest.role}
                    </h6>
                    <h6 className="fw-bold mb-2 ">{guest.name}</h6>
                    <p className="mb-2 fst-italic">{guest.description}</p>
                  </div>

                  <button className="profile-btn">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Guests;
