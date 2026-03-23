import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainHeader } from "./components/Header.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Homepage.tsx";
import { MainFooter } from "./components/Footer.tsx";

import "./styles/main.css";
import { ComprehensiveConfigProjectPage } from "./Pages/ComprehensiveConfig.tsx";
import { NotFound } from "./Pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="text-white d-flex flex-column min-vh-100">
      {/* user header regardless of page*/}
      <MainHeader />

      <main className="flex-grow-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<i>Under Development</i>} />
            <Route
              path="/projects/comprehensiveconfig"
              element={<ComprehensiveConfigProjectPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>

      {/* user footer regardless of page*/}
      <MainFooter />
    </div>
  </StrictMode>,
);
