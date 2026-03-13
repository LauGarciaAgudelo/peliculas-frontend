import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  estado: "ACTIVO",
  slogan: "",
  descripcion: "",
};

function ProductoraForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const esEdicion = Boolean(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (esEdicion) {
      const cargarProductora = async () => {
        try {
          setLoading(true);
          const response = await axiosClient.get(`/productoras/${id}`);
          setFormData({
            nombre: response.data.nombre || "",
            estado: response.data.estado || "ACTIVO",
            slogan: response.data.slogan || "",
            descripcion: response.data.descripcion || "",
          });
        } catch {
          Swal.fire("Error", "No fue posible cargar la productora", "error");
          navigate("/productoras");
        } finally {
          setLoading(false);
        }
      };
      cargarProductora();
    }
  }, [id, esEdicion, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      Swal.fire("Validación", "El nombre es obligatorio", "warning");
      return;
    }

    try {
      setLoading(true);

      if (esEdicion) {
        await axiosClient.put(`/productoras/${id}`, formData);
        Swal.fire("Actualizada", "La productora fue actualizada correctamente", "success");
      } else {
        await axiosClient.post("/productoras", formData);
        Swal.fire("Creada", "La productora fue creada correctamente", "success");
      }

      navigate("/productoras");
    } catch (error) {
      const message =
        error.response?.data?.message || "Ocurrió un error al guardar la productora";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={esEdicion ? "Editar Productora" : "Nueva Productora"}
        subtitle="Formulario de gestión de productora"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la productora"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="estado">Estado</label>
              <select
                id="estado"
                className="form-select"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="slogan">Slogan</label>
              <input
                id="slogan"
                type="text"
                className="form-control"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                placeholder="Ingrese el slogan"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                className="form-control"
                rows="4"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción"
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/productoras")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductoraForm;