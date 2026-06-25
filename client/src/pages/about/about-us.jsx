// src/pages/About/index.jsx

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function About() {
  const timeline = [
    {
      year: "2020",
      title: "Foundation",
      text: "Hunar Ki Pehachan was launched to identify and promote hidden talents across India.",
    },
    {
      year: "2021",
      title: "Digital Expansion",
      text: "Started online interviews, podcasts, and social media campaigns.",
    },
    {
      year: "2022",
      title: "National Recognition",
      text: "Featured entrepreneurs, artists, educators, and social changemakers.",
    },
    {
      year: "2023",
      title: "Community Growth",
      text: "Built a strong audience and network of talented individuals.",
    },
    {
      year: "2024",
      title: "New Opportunities",
      text: "Created collaborations and visibility opportunities for emerging talent.",
    },
  ];
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <div className="contact-us-header container">
        <section className=" bg-dark-about">
          <div className="container text-center">
            <h5 className="fw-bold">About Hunar Ki Pehachan</h5>

            <p className="custom-lead">
              Celebrating talent, inspiring youth, and creating opportunities
              for every skilled individual.
            </p>
            <div className="d-inline-block bg-white text-dark px-4 py-2 rounded-pill text-font-breadcrumbs">
              Home / About Us
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="about"
                  className="img-fluid rounded-4 shadow"
                />
              </div>

              <div className="col-lg-6">
                <h5 className="fw-bold mb-4">Our Journey Begins</h5>

                <p className="text-secondary mb-3">
                  Hunar Ki Pehachan was founded with a mission to discover,
                  promote, and celebrate talented individuals from every corner
                  of India.
                </p>

                <p className="text-secondary">
                  We believe every person has a unique skill that deserves
                  recognition and a platform to grow.
                </p>

                <a href="/contact" className="btn btn-dark mt-3 px-4">
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-3">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="fw-bold">What Drives Us</h5>
            </div>

            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 h-100 p-4 text-center">
                  <div className="fs-4 mb-3">🎯</div>

                  <h6 className="fw-bold mb-3">Mission</h6>

                  <p className="text-secondary">
                    Empower talented individuals through digital exposure and
                    opportunities.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 h-100 p-4 text-center">
                  <div className="fs-4 mb-3">🌍</div>

                  <h6 className="fw-bold mb-3">Vision</h6>

                  <p className="text-secondary">
                    Build India's biggest talent recognition platform.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 h-100 p-4 text-center">
                  <div className="fs-4 mb-3">📈</div>

                  <h6 className="fw-bold mb-3">Impact</h6>

                  <p className="text-secondary">
                    Thousands inspired through stories, interviews, and digital
                    media.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="impact-section py-5 rounded-4">
          <div className="container">
            <div className="text-center mb-5">
              <h4 className="fw-bold text-white">Numbers That Inspire</h4>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="impact-card text-center">
                  <div className="impact-icon">📖</div>
                  <h5>20+</h5>
                  <p>Inspiring Stories</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="impact-card text-center">
                  <div className="impact-icon">🏙️</div>
                  <h5>6+</h5>
                  <p>Cities Reached</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="impact-card text-center">
                  <div className="impact-icon">🎯</div>
                  <h5>8+</h5>
                  <p>Categories Covered</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="impact-card text-center">
                  <div className="impact-icon">🚀</div>
                  <h5>25K+</h5>
                  <p>Views & Impact</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-3 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="fw-bold">Our Journey Timeline</h5>
            </div>

            <div className="row g-4">
              {timeline.map((item, index) => (
                <div className="col-lg-6" key={index}>
                  <div className="card border-0 shadow rounded-4 p-4 h-100 ">
                    <div className="text-center">
                      <span className="year-badge">{item.year}</span>
                    </div>
                    <h6 className="fw-bold">{item.title}</h6>

                    <p className="text-secondary mb-0 ">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}

        <section
          className="py-5 text-center text-white rounded-4 mb-1"
          style={{
            background: "linear-gradient(90deg,rgb(7,27,47),rgb(16,86,40))",
            // background: "linear-gradient(135deg, #0d1c33 0%, #3d6587 45%, #924d51 100%)"
          }}
        >
          <div className="container">
            <h5 className="fw-bold mb-3">Ready To Showcase Your Talent?</h5>

            <p className="custom--lead">
              Join Hunar Ki Pehachan and become part of a growing community of
              creators, innovators, and achievers.
            </p>

            <button className="btn btn-light  px-3 rounded-pill mt-1">
              Contact Us
            </button>
          </div>
        </section>
      </div>
      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default About;
