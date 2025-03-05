import React, { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages /HomePage";
import Header from "./Components/Header";
import Slideshow from "./Pages /Slideshow";
import Footer from "./Components/Footer";
import About from "./Pages /About";
import Categories from "./Pages /Categories";
import Deals from "./Pages /Deals";
import History from "./Pages /History";
import Cart from "./Pages /Cart";
import { UserProvider } from "./Contest/userContext";
import { ProductProvider } from "./Contest/ProductContext";
import { UserContext } from "./Contest/userContext";
import LandingPage from "./Pages /LandingPage";
import Login from "./Pages /Login"; // Ensure this import exists
import RegisterForm from "./Pages /Register"; // Ensure this import exists

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-500">
      <Header />
      <Navbar
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}

      {/* Show Slideshow when user is logged in and on the homepage */}
      {user && location.pathname === "/home" && <Slideshow />}

      <div className="flex-grow">
        <Routes>
          {/* LandingPage is shown only on the root path */}
          <Route
            path="/"
            element={<LandingPage onGetStarted={handleGetStarted} />}
          />

          {/* HomePage is accessible to all users, logged in or not */}
          <Route path="/home" element={<HomePage />} />

          {/* Protected routes for logged-in users */}
          {user && (
            <>
              <Route path="/categories" element={<Categories />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/history" element={<History />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </>
          )}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
