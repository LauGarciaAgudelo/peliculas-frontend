import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageHeader from "../../components/PageHeader";
import Swal from "sweetalert2";

function MediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagenPortada: "",
    anioEstreno: "",
    generoId: "",
    directorId: "",
    productoraId: "",
    tipoId: "",
  });

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = Boolean(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarCombos = async () => {
    try {
      const [resGeneros, resDirectores, resProductoras, resTipos] =
        await Promise.all([
          axiosClient.get("/generos"),
          axiosClient.get("/directores"),
          axiosClient.get("/productoras"),
          axiosClient.get("/tipos"),
        ]);

      setGeneros(resGeneros.data);
      setDirectores(resDirectores.data);
      setProductoras(resProductoras.data);
      setTipos(resTipos.data);
    } catch (error) {
      const message = error.response?.data?.message || "No fue posible cargar los combos";
      Swal.fire("Error", message, "error");
    }
  };


  const cargarMedia = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/medias/${id}`);
      const media = response.data;

      setFormData({
        serial: media.serial || "",
        titulo: media.titulo || "",
        sinopsis: media.sinopsis || "",
        url: media.url || "",
        imagenPortada: media.imagenPortada || "",
        anioEstreno: media.anioEstreno || "",
        generoId: media.generoId?._id || "",
        directorId: media.directorId?._id || "",
        productoraId: media.productoraId?._id || "",
        tipoId: media.tipoId?._id || "",
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "No fue posible cargar la media";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.serial ||
      !formData.titulo ||
      !formData.anioEstreno ||
      !formData.generoId ||
      !formData.directorId ||
      !formData.productoraId ||
      !formData.tipoId
    ) {
      Swal.fire("Atención", "Completa los campos obligatorios", "warning");
      return;
    }

    try {
      const payload = {
        ...formData,
        anioEstreno: Number(formData.anioEstreno),
      };

      if (esEdicion) {
        await axiosClient.put(`/medias/${id}`, payload);
        Swal.fire("Actualizada", "La media fue actualizada correctamente", "success");
      } else {
        await axiosClient.post("/medias", payload);
        Swal.fire("Creada", "La media fue creada correctamente", "success");
      }

      navigate("/medias");
    } catch (error) {
      const message =
        error.response?.data?.message || "No fue posible guardar la media";
      Swal.fire("Error", message, "error");
    }
  };

  useEffect(() => {
    cargarCombos();
    if (esEdicion) {
      cargarMedia();
    }
  }, [id, cargarMedia, esEdicion]);

  return (
    <div>
      <PageHeader
        title={esEdicion ? "Editar Media" : "Nueva Media"}
        subtitle="Formulario para registrar películas o series"
      />

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <p>Cargando información...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="serial">Serial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="serial"
                    name="serial"
                    value={formData.serial}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="titulo">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="anioEstreno">Año de estreno</label>
                  <input
                    type="number"
                    className="form-control"
                    id="anioEstreno"
                    name="anioEstreno"
                    value={formData.anioEstreno}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="url">URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="imagenPortada">Imagen de portada</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagenPortada"
                    name="imagenPortada"
                    value={formData.imagenPortada}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="generoId">Género</label>
                  <select
                    className="form-select"
                    id="generoId"
                    name="generoId"
                    value={formData.generoId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un género</option>
                    {generos.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="directorId">Director</label>
                  <select
                    className="form-select"
                    id="directorId"
                    name="directorId"
                    value={formData.directorId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un director</option>
                    {directores.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombres}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="productoraId">Productora</label>
                  <select
                    className="form-select"
                    id="productoraId"
                    name="productoraId"
                    value={formData.productoraId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una productora</option>
                    {productoras.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="tipoId">Tipo</label>
                  <select
                    className="form-select"
                    id="tipoId"
                    name="tipoId"
                    value={formData.tipoId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un tipo</option>
                    {tipos.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label" htmlFor="sinopsis">Sinopsis</label>
                  <textarea
                    className="form-control"
                    id="sinopsis"
                    rows="4"
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {esEdicion ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/medias")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default MediaForm;