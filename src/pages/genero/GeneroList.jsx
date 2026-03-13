import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function GeneroList() {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarGeneros = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/generos");
      setGeneros(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No fue posible cargar los géneros", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  const eliminarGenero = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar género?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosClient.delete(`/generos/${id}`);
      Swal.fire("Eliminado", "El género fue eliminado correctamente", "success");
      cargarGeneros();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No fue posible eliminar el género", "error");
    }
  };

  let content;
  if (loading) {
    content = <div className="alert alert-info">Cargando géneros...</div>;
  } else if (generos.length === 0) {
    content = <div className="alert alert-warning">No hay géneros registrados.</div>;
  } else {
    content = (
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Fecha creación</th>
              <th>Fecha actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos.map((genero) => (
              <tr key={genero._id}>
                <td>{genero.nombre}</td>
                <td>{genero.estado}</td>
                <td>{genero.descripcion}</td>
                <td>{new Date(genero.createdAt).toLocaleString()}</td>
                <td>{new Date(genero.updatedAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/generos/editar/${genero._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarGenero(genero._id)}
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
          title="Módulo Género"
          subtitle="Gestión de géneros de películas y series"
        />
        <Link to="/generos/nuevo" className="btn btn-primary">
          Nuevo género
        </Link>
      </div>
      {content}
    </div>
  );
}

export default GeneroList;