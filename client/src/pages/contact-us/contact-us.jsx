// src/components/ContactPage/ContactPage.jsx

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { MapPin, Phone, Mail, Globe, Send } from "lucide-react";

function ContactPage() {
  return (
    <>
      <Header />

      <div className="contact-us-header container">
        {/* HERO SECTION */}
        <section className="bg-dark-contact">
          <div className="container text-center">
            <h5 className="fw-bold mb-3">Get In Touch With Us</h5>

            <p className="custom-lead">
              We’d love to hear from you. Reach out to us for collaborations,
              guest suggestions, talent showcases, or any inquiries about Hunar
              Ki Pehachan.
            </p>

            <div className="d-inline-block bg-white text-dark px-4 py-2 rounded-pill text-font-breadcrumbs">
              Home / Contact Us
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-2">
          <div className="container">
            <div className="row g-4">
              {/* LEFT SIDE */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 h-100 bg-light">
                  <h5 className="fw-bold mb-4 text-center">
                    Contact Information
                  </h5>

                  {/* ADDRESS */}
                  <div className="d-flex gap-3 pb-4 mb-4 border-bottom">
                    <div className="bg-color text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-2">Our Office</h6>
                      <p className="text-muted mb-0">
                        first floor, Lotus building, kh.no.365, Sultanpur
                        <br />
                        New Delhi, Delhi 110030
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="d-flex gap-3 pb-4 mb-4 border-bottom">
                    <div className="bg-color text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                      <Phone size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-2">Phone Number</h6>

                      <p className="text-muted mb-0">+91 8090400401</p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="d-flex gap-3 pb-4 mb-4 border-bottom">
                    <div className="bg-color text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                      <Mail size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-2">Email Address</h6>

                      <p className="text-muted mb-0">desk@hunarkipehchan.com</p>
                    </div>
                  </div>

                  {/* WEBSITE */}
                  <div className="d-flex gap-3">
                    <div className="bg-color text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                      <Globe size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-2">Website</h6>

                      <p className="text-muted mb-0">www.hunarkipehchan.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 h-100 text-center d-flex justify-content-center align-items-center">
                  <div className="w-100">
                    <h5 className="fw-bold mb-4">Send Us a Message</h5>

                    <form className="d-flex flex-column align-items-center">
                      <div className="mb-4 w-100 d-flex justify-content-center">
                        <input
                          type="text"
                          className="form-control rounded-5 w-75"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="mb-4 w-100 d-flex justify-content-center">
                        <input
                          type="email"
                          className="form-control rounded-5 w-75"
                          placeholder="Email"
                        />
                      </div>

                      <div className="mb-4 w-100 d-flex justify-content-center">
                        <input
                          type="text"
                          className="form-control rounded-5 w-75"
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="mb-4 w-100 d-flex justify-content-center">
                        <input
                          type="text"
                          className="form-control rounded-5 w-75"
                          placeholder="What is this regarding?"
                        />
                      </div>

                      <div className="mb-4 w-100 d-flex justify-content-center">
                        <textarea
                          rows="3"
                          className="form-control w-75 rounded-4"
                          placeholder="Message here..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-lg text-white fw-semibold w-75 border-0 rounded-pill d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background:
                            "linear-gradient(90deg, rgb(234, 220, 208) 0%, rgb(13, 28, 51) 100%)",
                        }}
                      >
                        <Send size={18} />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="py-2">
          <div className="container">
            <div className="card border-0 shadow-sm rounded-4 p-2 p-lg-2">
              {/* MAP */}
              <div className="mb-0">
                <h5 className="text-center fw-bold">Find Us Here</h5>
                <div className="overflow-hidden rounded-4">
                  <iframe
                    title="Green India Team Location"
                    src="https://www.google.com/maps?q=Green+India+Team+New+Delhi&output=embed"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="py-5">
          <div className="container">
            <div className="contact-faq mb-0">
              <h5 className="fw-bold text-center mb-4">
                Frequently Asked Questions
              </h5>

              <div className="accordion" id="faqAccordion">
                {/* FAQ 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                    >
                      What is Hunar Ki Pehachan?
                    </button>
                  </h2>

                  <div
                    id="faq1"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Hunar Ki Pehachan is a platform dedicated to discovering,
                      promoting, and celebrating talented individuals from
                      across India.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                    >
                      How can I showcase my talent on Hunar Ki Pehachan?
                    </button>
                  </h2>

                  <div
                    id="faq2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      You can contact our team through the contact form and
                      submit details about your talent, achievements, photos,
                      videos, or portfolio for review.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                    >
                      Is there any fee to participate?
                    </button>
                  </h2>

                  <div
                    id="faq3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      No, participation and talent submissions are completely
                      free unless specifically mentioned for a special event or
                      program.
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                    >
                      Can organizations collaborate with Hunar Ki Pehachan?
                    </button>
                  </h2>

                  <div
                    id="faq4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes, we welcome partnerships with educational
                      institutions, organizations, sponsors, and community
                      groups that support talent development and recognition.
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq5"
                    >
                      How can I contact the Hunar Ki Pehachan team?
                    </button>
                  </h2>

                  <div
                    id="faq5"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      You can reach us through our contact form, email, phone
                      number, or social media channels. Our team will get back
                      to you as soon as possible.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-hours-section">
          <div className="container">
            <div className="contact-business mb-2">
              <div className="business-hours-card">
                <h5 className="business-title">Business Hours</h5>

                <div className="hours-row">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>

                <div className="hours-row">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>

                <div className="hours-row closed">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>

                <div className="hours-row">
                  <span>Public Holidays</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
