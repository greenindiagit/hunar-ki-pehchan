// src/components/MissionVisionImpact/index.jsx

import { Target, Eye, LineChart } from "lucide-react";

function MissionVisionImpact() {
  const items = [
    {
      title: "Our Mission",
      text: "To identify, celebrate, and amplify the stories of Indians who have made significant contributions to society.",
      icon: <Target size={25} />,
      border: "#16a34a",
    },
    {
      title: "Our Vision",
      text: "To create a global platform that showcases Indian excellence across all fields and inspires future generations.",
      icon: <Eye size={25} />,
      border: "#16a34a",
    },
    {
      title: "Our Impact",
      text: "Through our platform, we have connected with millions of Indians worldwide and built a strong inspiring community.",
      icon: <LineChart size={25} />,
      border: "#1d4ed8",
    },
  ];

  return (
    <section className="py-2">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-4">
          <h5 className="fw-bold ">Our Mission, Vision & Impact</h5>
        </div>
        {/* Cards */}
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="bg-white h-100 text-center shadow-lg rounded-5 p-3"
                style={{
                  borderTop: `6px solid ${item.border}`,
                  transition: "0.3s",
                }}
              >
                {/* Icon */}
                <div
                  className="d-inline-flex justify-content-center align-items-center rounded-circle mb-4"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#f1f5f9",
                    color: item.border,
                  }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h5 className="fw-bold mb-3">{item.title}</h5>

                {/* Text */}
                <p className=" mb-0 fs-16 justify-content-start">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MissionVisionImpact;
