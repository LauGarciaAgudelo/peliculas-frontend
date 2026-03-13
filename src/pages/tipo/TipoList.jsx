import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function TipoList() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarTipos = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/tipos");
      setTipos(response.data);
    } catch {
      Swal.fire("Error", "No fue posible cargar los tipos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const eliminarTipo = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar tipo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosClient.delete(`/tipos/${id}`);
      Swal.fire("Eliminado", "El tipo fue eliminado correctamente", "success");
      cargarTipos();
    } catch (error) {
      Swal.fire("Error", `No fue posible eliminar el tipo: ${error.message || error}`, "error");
    }
  };

  let content;
  if (loading) {
    content = <div className="alert alert-info">Cargando tipos...</div>;
  } else if (tipos.length === 0) {
    content = <div className="alert alert-warning">No hay tipos registrados.</div>;
  } else {
    content = (
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha creación</th>
              <th>Fecha actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo._id}>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>{new Date(tipo.createdAt).toLocaleString()}</td>
                <td>{new Date(tipo.updatedAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/tipos/editar/${tipo._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarTipo(tipo._id)}
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
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <PageHeader
          title="Módulo Tipo"
          subtitle="Gestión de tipos de multimedia"
        />
        <Link to="/tipos/nuevo" className="btn btn-primary">
          Nuevo tipo
        </Link>
      </div>

      {content}
    </div>
  );
}

export default TipoList;