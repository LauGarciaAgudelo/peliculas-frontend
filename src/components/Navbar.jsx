import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
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