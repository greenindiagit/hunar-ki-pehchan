import { useEffect, useState } from "react";

import "./footer.css";
const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer pt-4">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About */}
          <div className="col-12 col-md-5 mb-4">
            <img
              src="/assets/img/logo.png"
              alt="logo"
              className="footer_logo mb-2"
            />

            <p className="footer-title-p">
              Hunar Ki Pehchan is a digital platform to showcase the hidden
              talent of Bharat to the world. Here artists, creators, and
              professionals get a trusted and modern platform to showcase their
              skills and achievements, which can give their talent journey a new
              identity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-2 mb-4">
            <h6 className="footer-title">Quick Links</h6>

            <ul className="list-unstyled small  footer-links">
              <li>
                <a href="/about">About Us</a>
              </li>

              <li>
                <a href="terms">Terms & conditions</a>
              </li>
              <li>
                <a href="privacy">Privacy policy</a>
              </li>
              <li>
                <a href="disclaimer">Disclaimer</a>
              </li>
            </ul>
          </div>
          {/* media */}
          <div className="col-12 col-md-2 mb-4">
            <h6>Media</h6>
            <ul className="list-unstyled small  footer-links">
              <li>
                <a href="/photo-gallery">Photo Gallery</a>
              </li>
              <li>
                <a href="/video-gallery">Video Gallery</a>
              </li>
              <li>
                <a href="/upcoming-events">Upcoming Events</a>
              </li>
              <li>
                <a href="/completed-events">Completed Events</a>
              </li>
            </ul>
          </div>
          {/* Social */}
          <div className="col-12 col-md-3 mb-4">
            <h6>Keep In Touch</h6>

            <ul className="social-icon d-flex justify-content-center justify-content-md-start gap-2 list-unstyled mt-3">
              <li>
                <a
                  href="https://hunarkipehachan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/img/icons/link.svg"
                    width="22"
                    alt="facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/hunarkipehchan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/img/icons/fb.svg"
                    width="22"
                    alt="facebook"
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/hunarkipehchan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/img/icons/instagram.svg"
                    width="22"
                    alt="instagram"
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/@HunarKiPehchan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/img/icons/youtube.svg"
                    width="22"
                    alt="youtube"
                  />
                </a>
              </li>

              {/* <li>
                <a
                  href="https://www.linkedin.com/company/green-india-team/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/img/icons/linkedin.svg"
                    width="22"
                    alt="linkedin"
                  />
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom-p">
          © Copyright 2025 Hunar Ki Pehachan Pvt. Ltd. All Rights Reserved.
        </p>
      </div>

      {showButton && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
