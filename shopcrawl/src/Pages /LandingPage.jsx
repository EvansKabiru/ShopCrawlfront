import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-60 to-purple-500 min-h-screen p-6">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
          Shopcrawl: Smarter Shopping Decisions
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
          Automatically compute the marginal benefit (MB) and cost-benefit (CB)
          analysis of purchasing products across different e-shops.
        </p>
        <button
          onClick={handleNavigateToHome}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
        >
          Get Started
        </button>
      </section>


      {/* How It Works Section */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          The web is made specifically to compare the prices of
          commodities/products sold by different e-commerce shops like Jumia,
          Amazon, Kilimall, and Alibaba.
        </p>
        <div className="flex justify-center mt-6">
          <img
            src="/images/shopcrawl-demo.png"
            alt="Shopcrawl Demo"
            className="w-full md:w-2/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
