import "./App.css";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ViewBlog from "./components/ViewBlog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import { ToastProvider } from "./context/ToastContext";
import { VisibilityProvider } from "./context/VisibilityContext";

function App() {
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <VisibilityProvider>
        <ToastProvider>
          <Router>
            <Navbar />

            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/blogs" element={<Blogs />}></Route>
              <Route exact path="/contact" element={<Contact />}></Route>
              <Route exact path="/viewblog/:id" element={<ViewBlog />}></Route>
              <Route exact path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Router>
        </ToastProvider>
      </VisibilityProvider>
    </div>
  );
}

export default App;
