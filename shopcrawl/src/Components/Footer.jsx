import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6 bg-gray-900 text-white text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Shopcrawl. All rights reserved.
      </p>
      <p className="mt-4 text-xl text-orange-100 font-semibold">
        Comparison of different things making your shopping easy and cheap
      </p>
      <br />
      <Link to="/about" className="text-blue-400 hover:underline">
        About Us
      </Link>
    </footer>
  );
}

export default Footer;
