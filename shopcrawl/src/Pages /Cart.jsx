import React, { useState } from "react";

export default function ShoppingCart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Throwback Hip Bag",
      price: 90.0,
      quantity: 1,
      image:
        "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      color: "Salmon",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      price: 32.0,
      quantity: 1,
      image:
        "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      color: "Blue",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {isOpen ? "Close Cart" : "Open Cart"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 max-w-md w-screen transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-white shadow-xl p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500">
            ✖
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="flex py-6">
              <img
                className="w-24 h-24 rounded-md border"
                src={item.image}
                alt={item.name}
              />
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500">{item.color}</p>
                <div className="flex justify-between text-sm mt-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-12 border p-1 rounded-md"
                    min="1"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between text-base font-medium">
            <p>Subtotal</p>
            <p>${calculateTotal()}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Shipping and taxes calculated at checkout.
          </p>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md mt-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
