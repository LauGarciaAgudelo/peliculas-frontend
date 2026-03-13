import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  descripcion: "",
};

function TipoForm() {
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


  const cargarTipo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/tipos/${id}`);
      setFormData({
        nombre: response.data.nombre || "",
        descripcion: response.data.descripcion || "",
      });
    } catch (error) {
      const message = error.response?.data?.message || "No fue posible cargar el tipo";
      Swal.fire("Error", message, "error");
      navigate("/tipos");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (esEdicion) {
      cargarTipo();
    }
  }, [esEdicion, cargarTipo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      Swal.fire("Validación", "El nombre es obligatorio", "warning");
      return;
    }

    try {
      setLoading(true);

      if (esEdicion) {
        await axiosClient.put(`/tipos/${id}`, formData);
        Swal.fire("Actualizado", "El tipo fue actualizado correctamente", "success");
      } else {
        await axiosClient.post("/tipos", formData);
        Swal.fire("Creado", "El tipo fue creado correctamente", "success");
      }

      navigate("/tipos");
    } catch (error) {
      const message =
        error.response?.data?.message || "Ocurrió un error al guardar el tipo";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={esEdicion ? "Editar Tipo" : "Nuevo Tipo"}
        subtitle="Formulario de gestión de tipo"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del tipo"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control"
                id="descripcion"
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
                onClick={() => navigate("/tipos")}
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

export default TipoForm;