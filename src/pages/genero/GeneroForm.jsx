import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  estado: "ACTIVO",
  descripcion: "",
};

function GeneroForm() {
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


  const cargarGenero = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/generos/${id}`);
      setFormData({
        nombre: response.data.nombre || "",
        estado: response.data.estado || "ACTIVO",
        descripcion: response.data.descripcion || "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No fue posible cargar el género", "error");
      navigate("/generos");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (esEdicion) {
      cargarGenero();
    }
  }, [esEdicion, cargarGenero]);

  async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.nombre.trim()) {
            Swal.fire("Validación", "El nombre es obligatorio", "warning");
            return;
        }

        try {
            setLoading(true);

            if (esEdicion) {
                await axiosClient.put(`/generos/${id}`, formData);
                Swal.fire("Actualizado", "El género fue actualizado correctamente", "success");
            } else {
                await axiosClient.post("/generos", formData);
                Swal.fire("Creado", "El género fue creado correctamente", "success");
            }

            navigate("/generos");
        } catch (error) {
            const message = error.response?.data?.message || "Ocurrió un error al guardar el género";
            Swal.fire("Error", message, "error");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
      <PageHeader
        title={esEdicion ? "Editar Género" : "Nuevo Género"}
        subtitle="Formulario de gestión de género"
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
                placeholder="Ingrese el nombre del género"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="estado">Estado</label>
              <select
                className="form-select"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
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
                onClick={() => navigate("/generos")}
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

export default GeneroForm;