import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const cargarProductoras = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/productoras");
      setProductoras(response.data);
    } catch (error) {
      const message =
        error.response?.data?.message || "No fue posible cargar las productoras";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProductora = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Eliminar productora?",
      text: `Se eliminará la productora "${nombre}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosClient.delete(`/productoras/${id}`);
      Swal.fire("Eliminada", "La productora fue eliminada correctamente", "success");
      cargarProductoras();
    } catch (error) {
      const message =
        error.response?.data?.message || "No fue posible eliminar la productora";
      Swal.fire("Error", message, "error");
    }
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  let content;
  if (loading) {
    content = <p>Cargando productoras...</p>;
  } else if (productoras.length === 0) {
    content = <p>No hay productoras registradas.</p>;
  } else {
    content = (
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Slogan</th>
              <th>Descripción</th>
              <th style={{ width: "180px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productoras.map((productora) => (
              <tr key={productora._id}>
                <td>{productora.nombre}</td>
                <td>{productora.estado}</td>
                <td>{productora.slogan || "-"}</td>
                <td>{productora.descripcion || "-"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        navigate(`/productoras/editar/${productora._id}`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        eliminarProductora(productora._id, productora.nombre)
                      }
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
      <PageHeader
        title="Productoras"
        subtitle="Listado de productoras registradas"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/productoras/nuevo")}
            >
              Nueva Productora
            </button>
          </div>

          {content}
        </div>
      </div>
    </div>
  );
}

export default ProductoraList;