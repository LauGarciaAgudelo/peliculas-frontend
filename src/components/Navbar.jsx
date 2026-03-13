import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
          <i className="bi bi-film me-2"></i>{" "}
          Media Manager
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContenido"
          aria-controls="navbarContenido"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContenido">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
              <i className="bi bi-house-door me-1"></i>{" "}
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/generos"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-tags me-1"></i>{" "}
                Género
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/directores"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-person-video3 me-1"></i> {" "}
                Director
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/productoras"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-building me-1"></i>{" "}
                Productora
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tipos"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-collection me-1"></i>{" "}
                Tipo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/medias"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-film me-1"></i>{" "}
                Media
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;