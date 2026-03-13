import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container py-4" style={{ minHeight: "80vh" }}>
        <AppRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;