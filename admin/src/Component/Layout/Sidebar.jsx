import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaLink,
  FaVideo,
  FaCog,
  FaBars,
  FaDatabase,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);
  const [openMenu, setOpenMenu] = useState({});

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Master",
      icon: <FaDatabase />,
      children: [
        { name: "Banner List", path: "/banner-list" },
        { name: "Episode List", path: "/episode-list" },
        { name: "Guest List", path: "/guest" },
        { name: "Role List", path: "/role" },
      ],
    },

    {
      name: "Quick Link",
      icon: <FaLink />,
      children: [
        { name: "Quick Link", path: "/content-list" },
      ],
    },

    {
      name: "Media",
      icon: <FaVideo />,
      children: [
        { name: "Photo Gallery", path: "/photo-gallery" },
        { name: "Video Gallery", path: "/video-gallery" },
        { name: "Upcoming Events", path: "/event-list" },
        { name: "Completed Events", path: "/completed-events" },
      ],
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) =>
          location.pathname.startsWith(child.path)
        )
      ) {
        setOpenMenu((prev) => ({
          ...prev,
          [item.name]: true,
        }));
      }
    });
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header d-lg-none">
        <button
          className="menu-btn"
          onClick={() => setShowSidebar(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="sidebar d-none d-lg-block">
        <div className="sidebar-logo">
          <h4>Admin Panel</h4>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <>
                  <div
                    className={`sidebar-link ${
                      openMenu[item.name] ? "open" : ""
                    }`}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="menu-left">
                      <span className="sidebar-icon">
                        {item.icon}
                      </span>

                      <span>{item.name}</span>
                    </div>

                    <FaChevronRight
                      className={`menu-arrow ${
                        openMenu[item.name] ? "rotate" : ""
                      }`}
                    />
                  </div>

                  {openMenu[item.name] && (
                    <ul className="submenu">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={`sidebar-link sub-link ${
                              location.pathname === child.path
                                ? "active"
                                : ""
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`sidebar-link ${
                    location.pathname === item.path
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="menu-left">
                    <span className="sidebar-icon">
                      {item.icon}
                    </span>

                    <span>{item.name}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-sidebar ${
          showSidebar ? "show" : ""
        }`}
        onClick={() => setShowSidebar(false)}
      >
        <div
          className="mobile-sidebar-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sidebar-logo">
            <h4>Admin Panel</h4>
          </div>

          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    <div
                      className="sidebar-link"
                      onClick={() =>
                        toggleMenu(item.name)
                      }
                    >
                      <div className="menu-left">
                        <span className="sidebar-icon">
                          {item.icon}
                        </span>

                        <span>{item.name}</span>
                      </div>

                      <FaChevronRight
                        className={`menu-arrow ${
                          openMenu[item.name]
                            ? "rotate"
                            : ""
                        }`}
                      />
                    </div>

                    {openMenu[item.name] && (
                      <ul className="submenu">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className={`sidebar-link sub-link ${
                                location.pathname ===
                                child.path
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setShowSidebar(false)
                              }
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`sidebar-link ${
                      location.pathname === item.path
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setShowSidebar(false)
                    }
                  >
                    <div className="menu-left">
                      <span className="sidebar-icon">
                        {item.icon}
                      </span>

                      <span>{item.name}</span>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;