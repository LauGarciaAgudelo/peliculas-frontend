import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

const initialForm = {
  nombres: "",
  estado: "ACTIVO",
};

function DirectorForm() {
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

  const cargarDirector = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/directores/${id}`);
      setFormData({
        nombres: response.data.nombres || "",
        estado: response.data.estado || "ACTIVO",
      });
    } catch (error) {
      const message = error.response?.data?.message || "No fue posible cargar el director";
      Swal.fire("Error", message, "error");
      navigate("/directores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (esEdicion) {
      cargarDirector();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombres.trim()) {
      Swal.fire("Validación", "Los nombres son obligatorios", "warning");
      return;
    }

    try {
      setLoading(true);

      if (esEdicion) {
        await axiosClient.put(`/directores/${id}`, formData);
        Swal.fire("Actualizado", "El director fue actualizado correctamente", "success");
      } else {
        await axiosClient.post("/directores", formData);
        Swal.fire("Creado", "El director fue creado correctamente", "success");
      }

      navigate("/directores");
    } catch (error) {
      const message =
        error.response?.data?.message || "Ocurrió un error al guardar el director";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={esEdicion ? "Editar Director" : "Nuevo Director"}
        subtitle="Formulario de gestión de director"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input
                type="text"
                className="form-control"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Ingrese el nombre del director"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/directores")}
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

export default DirectorForm;