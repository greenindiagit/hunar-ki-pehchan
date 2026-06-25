// src/components/Banner/index.jsx

import { useEffect, useRef, useState } from "react";

function Banner() {
  const banners = [
    {
      title: "Hunar Ki Pehachan",
      desc: "Bharat ke talented logon ko ek digital identity dene ka platform.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "Apna Talent Dikhao",
      desc: "Creators aur professionals ke liye ek trusted platform.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      title: "India's Digital Stage",
      desc: "Aapke skills ko global audience tak pahuchane ka mission.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
    {
      title: "Creative Future",
      desc: "Har talent ko milega ek bada opportunity platform.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Grow With Us",
      desc: "Events, media aur networking ke saath career growth.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    },
  ];

  const [current, setCurrent] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // AUTO SLIDE
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [banners.length]);

  // NEXT
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  // PREV
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // TOUCH START
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  // TOUCH MOVE
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  // TOUCH END
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <section
      className="py-5"
      style={{
        marginTop: "60px",
        background: "#f5f7fb",
      }}
    >
      <div className="container">
        {/* BANNER */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="row align-items-center justify-content-between rounded-5 mx-0 position-relative"
          style={{
            minHeight: "340px",
            background: "linear-gradient(135deg, #003b7a, #005d9f)",
            padding: "50px",
            gap: "40px",
            transition: "0.5s ease",
          }}
        >
          {/* LEFT */}
          <div className="col-lg-6 text-white p-0">
            <h2
              className="fw-bold mb-4"
              style={{
                fontSize: "58px",
                lineHeight: "1.2",
              }}
            >
              {banners[current].title}
            </h2>

            <p
              className="mb-4"
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            >
              {banners[current].desc}
            </p>

            <button className="btn btn-light fw-bold px-4 py-3 rounded-4 text-primary">
              Explore Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-5 p-0">
            <img
              src={banners[current].image}
              alt="banner"
              className="img-fluid w-100 rounded-4"
              style={{
                height: "280px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow"
            style={{
              width: "50px",
              height: "50px",
              left: "-20px",
            }}
          >
            ❮
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow"
            style={{
              width: "50px",
              height: "50px",
              right: "-20px",
            }}
          >
            ❯
          </button>
        </div>

        {/* DOTS */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="border-0"
              style={{
                width: current === index ? "28px" : "12px",
                height: "12px",
                borderRadius: "30px",
                background: current === index ? "#005d9f" : "#bdbdbd",
                transition: "0.3s",
              }}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;
