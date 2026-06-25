// src/components/DonationSection/index.jsx

function DonationSection() {
  return (
    <section className="py-2">
      <div className="container">
        <div className="position-relative overflow-hidden rounded-5 text-white d-flex align-items-center justify-content-center text-center p-5 donation-body">
          {/* Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.7))",
            }}
          ></div>

          {/* Content */}
          <div className="position-relative max-w-875">
            {/* Heading */}
            <h2 className="fw-bold mb-4">
              Support the Mission of Celebration of Humar Ki Pehachan
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-750 fs-16">
              Your support helps us find, chronicle and honor the inspiring
              journeys of talented Indians who are making the country proud
              through their achievements, creativity and impact on society.
            </p>

            {/* Button */}
            {/* <button className="btn btn-warning btn-lg rounded-pill px-5 py-2 fw-bold mt-4">
              Donate Now
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationSection;
