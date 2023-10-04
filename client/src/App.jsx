import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./routes/Home";
import { Recent } from "./routes/Recent";
import { Footer } from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/main.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recent_document/" element={<Recent />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          <Toaster />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
