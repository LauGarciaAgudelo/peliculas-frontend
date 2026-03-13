import { Navigate, Route, Routes } from "react-router-dom";
import GeneroList from "../pages/genero/GeneroList";
import GeneroForm from "../pages/genero/GeneroForm";
import DirectorList from "../pages/director/DirectorList";
import DirectorForm from "../pages/director/DirectorForm";
import ProductoraList from "../pages/productora/ProductoraList";
import ProductoraForm from "../pages/productora/ProductoraForm";
import TipoList from "../pages/tipo/TipoList";
import TipoForm from "../pages/tipo/TipoForm";
import MediaList from "../pages/media/MediaList";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/generos" />} />

      <Route path="/generos" element={<GeneroList />} />
      <Route path="/generos/nuevo" element={<GeneroForm />} />
      <Route path="/generos/editar/:id" element={<GeneroForm />} />

      <Route path="/directores" element={<DirectorList />} />
      <Route path="/directores/nuevo" element={<DirectorForm />} />
      <Route path="/directores/editar/:id" element={<DirectorForm />} />

      <Route path="/productoras" element={<ProductoraList />} />
      <Route path="/productoras/nuevo" element={<ProductoraForm />} />
      <Route path="/productoras/editar/:id" element={<ProductoraForm />} />

      <Route path="/tipos" element={<TipoList />} />
      <Route path="/tipos/nuevo" element={<TipoForm />} />
      <Route path="/tipos/editar/:id" element={<TipoForm />} />

      <Route path="/medias" element={<MediaList />} />
    </Routes>
  );
}

export default AppRouter;