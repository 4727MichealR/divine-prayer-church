
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Admin from "./pages/Admin.jsx";
import Gallery from "./pages/Gallery.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
