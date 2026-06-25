import "./hero.css";

import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";
function Hero() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(apis.banners.get);
        // console.log("Banners:", res.data.data);

        if (res.data.success) {
          setBanners(res.data.data);
        }
      } catch (error) {
        console.error("Banner fetch error:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <section className="hero-section ">
      <div className="container py-2">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></button>
            ))}
          </div>

          {/* Slides */}

          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`${BASE_URL}/${banner.image}`}
                  className="d-block w-100 hero-banner"
                  alt={banner.name}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
