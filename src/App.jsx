import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container py-4">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;