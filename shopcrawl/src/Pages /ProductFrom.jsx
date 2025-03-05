// import { useState } from "react";

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: "",
//     rating: "",
//     rating_count: "",
//     delivery_cost: "",
//     payment_mode: "",
//     shop_id: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Product added successfully!");
//         setFormData({
//           name: "",
//           description: "",
//           category: "",
//           price: "",
//           rating: "",
//           rating_count: "",
//           delivery_cost: "",
//           payment_mode: "",
//           shop_id: "",
//         });
//       } else {
//         alert("Failed to add product");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 border rounded shadow-lg"
//     >
//       <h2 className="text-xl font-bold mb-4">Add Product</h2>
//       {Object.keys(formData).map((key) => (
//         <div key={key} className="mb-2">
//           <label className="block text-sm font-semibold mb-1" htmlFor={key}>
//             {key.replace("_", " ").toUpperCase()}
//           </label>
//           <input
//             type={
//               key === "price" ||
//               key === "rating" ||
//               key === "rating_count" ||
//               key === "delivery_cost"
//                 ? "number"
//                 : "text"
//             }
//             id={key}
//             name={key}
//             value={formData[key]}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required={
//               key !== "description" &&
//               key !== "rating" &&
//               key !== "rating_count" &&
//               key !== "payment_mode"
//             }
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// };

// export default ProductForm;
