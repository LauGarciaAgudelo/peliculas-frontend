import { Navigate, Route, Routes } from "react-router-dom";
import GeneroList from "../pages/genero/GeneroList";
import DirectorList from "../pages/director/DirectorList";
import ProductoraList from "../pages/productora/ProductoraList";
import TipoList from "../pages/tipo/TipoList";
import MediaList from "../pages/media/MediaList";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/generos" />} />
      <Route path="/generos" element={<GeneroList />} />
      <Route path="/directores" element={<DirectorList />} />
      <Route path="/productoras" element={<ProductoraList />} />
      <Route path="/tipos" element={<TipoList />} />
      <Route path="/medias" element={<MediaList />} />
    </Routes>
  );
}

export default AppRouter;