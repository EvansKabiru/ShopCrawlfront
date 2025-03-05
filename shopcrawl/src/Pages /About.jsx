import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate(); // Move it inside the component

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">About Shopcrawl</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Features */}
        <div className="flex items-center space-x-4">
          <h2 className="font-semibold text-lg">Great Value</h2>
          <p>
            We offer competitive prices on our 10 million plus product range.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <h2 className="font-semibold text-lg">Worldwide Delivery</h2>
          <p>
            With sites in 3 languages, we ship to over 20 countries & regions.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <h2 className="font-semibold text-lg">Safe Payment</h2>
          <p>Pay with the world’s most popular and secure payment methods.</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Shopcrawl - Online Shopping</h2>
        <p className="mt-2">
          Shopcrawl is a leading online shopping platform. Our mission is to
          provide an easy, reliable, and secure online shopping experience.
        </p>
      </div>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default About;
