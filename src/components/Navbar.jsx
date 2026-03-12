import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Películas App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/generos">
                Género
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/directores">
                Director
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productoras">
                Productora
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tipos">
                Tipo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medias">
                Media
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;