import React, { useEffect, useState } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed-top custom-border ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg py-2">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src="/assets/img/logo.png" alt="logo" height="60" />
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto gap-lg-4 text-center">
              <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/photo-gallery">
                  Media
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold text-dark"
                  href="/completed-events"
                >
                  Events
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
