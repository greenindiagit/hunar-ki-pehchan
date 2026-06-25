import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";

function FeaturedEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await axios.get(apis.episodes.get);

        if (res.data.success) {
          setEpisodes(res.data.data || []);
        }
      } catch (error) {
        console.error("Episode fetch error:", error);
      }
    };

    fetchEpisode();
  }, []);

const getEmbedUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "";
  }

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?&/]+)/;

  const match = url.match(regExp);

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : "";
};

// console.log(getEmbedUrl );
  return (
    <>
      {/* SECTION */}
      <section className="py-2">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-4 fs-3">
            <h5 className="fw-bold">Popular Episodes</h5>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {episodes.map((item, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div
                  className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 position-relative"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                onClick={() => setActiveVideo(getEmbedUrl(item.videoUrl))}
                >
                  {/* Image */}
                  <img
                    // src={`${item.thumbnail}?w=500`}
                    src={`${BASE_URL}/${item.image}?w=500`}
                    alt={item.title}
                    loading="lazy"
                    className="card-img-top"
                  />

                  {/* Overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                    }}
                  ></div>

                  {/* Play Button */}
                  <div
                    className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center rounded-circle bg-danger text-white"
                    style={{
                      width: "35px",
                      height: "35px",
                      fontSize: "18px",
                    }}
                  >
                    ▶
                  </div>

                  {/* Title */}
                  <div
                    className="position-absolute bottom-0 start-0 p-4 text-white"
                    style={{
                      zIndex: 2,
                    }}
                  >
                    <h6 className="fw-bold mb-0 fs-16">{item.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="position-relative w-100"
            style={{
              maxWidth: "900px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="btn btn-danger rounded-circle position-absolute"
              style={{
                top: "-50px",
                right: "0",
                width: "40px",
                height: "40px",
              }}
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            {/* Video */}
            <iframe
              width="100%"
              height="500"
              src={activeVideo}
              title="video"
              frameBorder="0"
              allowFullScreen
              className="rounded-4"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedEpisodes;
