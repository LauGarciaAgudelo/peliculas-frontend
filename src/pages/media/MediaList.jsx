import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function MediaList() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const cargarMedias = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/medias");
      setMedias(response.data);
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "No fue posible cargar las medias";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  const eliminarMedia = async (id, titulo) => {
    const result = await Swal.fire({
      title: "¿Eliminar media?",
      text: `Se eliminará "${titulo}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosClient.delete(`/medias/${id}`);
      Swal.fire("Eliminada", "La media fue eliminada correctamente", "success");
      cargarMedias();
    } catch (error) {
      const message =
        error.response?.data?.message || "No fue posible eliminar la media";
      Swal.fire("Error", message, "error");
    }
  };

  useEffect(() => {
    cargarMedias();
  }, []);

  return (
    <div>
      <PageHeader
        title="Media"
        subtitle="Listado de películas y series registradas"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/medias/nuevo")}
            >
              Nueva Media
            </button>
          </div>

          {(() => {
            if (loading) {
              return <p>Cargando medias...</p>;
            }
            if (medias.length === 0) {
              return <p>No hay registros de media.</p>;
            }
            return (
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Serial</th>
                      <th>Título</th>
                      <th>Año</th>
                      <th>Género</th>
                      <th>Director</th>
                      <th>Productora</th>
                      <th>Tipo</th>
                      <th style={{ width: "180px" }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medias.map((media) => (
                      <tr key={media._id}>
                        <td>{media.serial}</td>
                        <td>{media.titulo}</td>
                        <td>{media.anioEstreno}</td>
                        <td>{media.generoId?.nombre || "-"}</td>
                        <td>{media.directorId?.nombres || "-"}</td>
                        <td>{media.productoraId?.nombre || "-"}</td>
                        <td>{media.tipoId?.nombre || "-"}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => navigate(`/medias/editar/${media._id}`)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarMedia(media._id, media.titulo)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default MediaList;