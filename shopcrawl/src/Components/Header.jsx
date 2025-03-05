// HeaderPage.jsx
import React from "react";

const Header = () => {
  return (
    <div >
      {/* Fancy Header */}
      <header className="w-full bg-gradient-to-r bg-slate-800 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Shopcrawl
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
