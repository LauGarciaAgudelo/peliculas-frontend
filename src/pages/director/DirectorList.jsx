import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function DirectorList() {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDirectores = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/directores");
      setDirectores(response.data);
    } catch (error) {
      Swal.fire("Error", `No fue posible cargar los directores: ${error.message || error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDirectores();
  }, []);

  const eliminarDirector = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar director?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosClient.delete(`/directores/${id}`);
      Swal.fire("Eliminado", "El director fue eliminado correctamente", "success");
      cargarDirectores();
    } catch (error) {
      Swal.fire("Error", `No fue posible eliminar el director: ${error.message || error}`, "error");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <PageHeader
          title="Módulo Director"
          subtitle="Gestión de directores principales"
        />
        <Link to="/directores/nuevo" className="btn btn-primary">
          Nuevo director
        </Link>
      </div>

      {loading ? (
        <div className="alert alert-info">Cargando directores...</div>
      ) : directores.length === 0 ? (
        <div className="alert alert-warning">No hay directores registrados.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Nombres</th>
                <th>Estado</th>
                <th>Fecha creación</th>
                <th>Fecha actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {directores.map((director) => (
                <tr key={director._id}>
                  <td>{director.nombres}</td>
                  <td>{director.estado}</td>
                  <td>{new Date(director.createdAt).toLocaleString()}</td>
                  <td>{new Date(director.updatedAt).toLocaleString()}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/directores/editar/${director._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarDirector(director._id)}
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
      )}
    </div>
  );
}

export default DirectorList;