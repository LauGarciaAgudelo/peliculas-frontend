import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const modulos = [
    {
      titulo: "Género",
      descripcion: "Administra los géneros de películas y series.",
      ruta: "/generos",
      boton: "Ver módulo",
    },
    {
      titulo: "Director",
      descripcion: "Gestiona los directores registrados en el sistema.",
      ruta: "/directores",
      boton: "Ver módulo",
    },
    {
      titulo: "Productora",
      descripcion: "Consulta y administra las productoras.",
      ruta: "/productoras",
      boton: "Ver módulo",
    },
    {
      titulo: "Tipo",
      descripcion: "Administra los tipos de contenido multimedia.",
      ruta: "/tipos",
      boton: "Ver módulo",
    },
    {
      titulo: "Media",
      descripcion: "Gestiona películas y series con sus relaciones.",
      ruta: "/medias",
      boton: "Ver módulo",
    },
  ];

  return (
    <div>
      <div className="p-4 p-md-5 mb-4 rounded-3 shadow-sm text-white"
        style={{ background: "linear-gradient(135deg, #0078d4, #0361a8)" }}>
        <div className="container-fluid py-2">
            <h1 className="display-6 fw-bold">Sistema de Gestión de Media</h1>

        <p className="col-md-10 fs-5">
        Aplicación web administrativa desarrollada en ReactJS para gestionar
        géneros, directores, productoras, tipos, películas y series.
        </p>
          <button
            className="btn btn-dark btn-lg mt-2"
            onClick={() => navigate("/medias")}
          >
            Ir al módulo principal
          </button>
        </div>
      </div>

      <div className="row">
        {modulos.map((modulo) => (
          <div className="col-md-6 col-lg-4 mb-4" key={modulo.titulo}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{modulo.titulo}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {modulo.descripcion}
                </p>
                <button
                  className="btn btn-outline-dark mt-2"
                  onClick={() => navigate(modulo.ruta)}
                >
                  {modulo.boton}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
}

export default Home;