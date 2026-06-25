// src/components/OurImpact/index.jsx

function OurImpact() {
  const stats = [
    {
      number: "10K+",
      label: "Students Trained",
    },
    {
      number: "500+",
      label: "Experts Joined",
    },
    {
      number: "1K+",
      label: "Projects Completed",
    },
    {
      number: "50+",
      label: "Workshops Conducted",
    },
  ];

  return (
    <section className="py-2">
      <div className="container">
        {/* WRAPPER */}
        <div
          className="rounded-5 p-4 p-lg-3"
          style={{
            background: "linear-gradient(135deg, #1e043a, #1b4184)",
          }}
        >
          {/* Heading */}
          <div className="text-center text-white">
            <span className="badge fs-3 ">Our Achievements</span>
          </div>

          {/* Stats */}
          <div className="row g-2 mt-2 ">
            {stats.map((item, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div
                  className="h-100 text-center rounded-5 p-3"
                  style={{
                    background: "#f424",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h6 className="fw-bold text-white mb-3  fs-16">
                    {item.number}
                  </h6>

                  <p className="mb-0 text-light  fs-16">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurImpact;
