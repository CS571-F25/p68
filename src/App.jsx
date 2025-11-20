import { HashRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import About from "./pages/About";
import Tutorial from "./pages/Tutorial";
import Footer from "./components/Footer";

export default function App() {
  return (
    <HashRouter>
      <TopNav />
      <main className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

