import { useState, useEffect } from "react";
import { Camera, Edit } from "lucide-react";

export default function ProfileUploader() {
  const [image, setImage] = useState(
    () => localStorage.getItem("profileImage") || null
  );

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute right-10 top-30">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileUpload"
        onChange={handleImageUpload}
      />
      <label htmlFor="fileUpload" className="cursor-pointer">
        <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera size={48} className="text-gray-400" />
          )}
        </div>
      </label>

      {image && (
        <button
          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => document.getElementById("fileUpload").click()}
        >
          <Edit size={16} />
        </button>
      )}
    </div>
  );
}
