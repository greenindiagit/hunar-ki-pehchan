import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";


function PhotoGallery() {
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
    <>
      {/* HEADER */}
      <Header />

      <section className="photo-gallery-header">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-3">
            <h6 className="fw-bold fs-3">Photo Gallery</h6>
          </div>

          {/* Gallery */}
          <div className="row g-4">
            {guests.map((guest, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <img
                    // src={photo}
                     src={`${BASE_URL}/${guest.image}`}
                    alt={guest.name}
                    className="card-img-top"
                  />
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

export default PhotoGallery;
