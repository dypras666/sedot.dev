import React, { useState } from 'react';
// import './Order.css'; // Pastikan untuk mengimpor file CSS

const quantumProducts = [
  {
    id: 1,
    name: "QuantumCore Processor",
    description: "Next-gen quantum processor with 128 qubits",
    price: 999999.99,
    image: "https://picsum.photos/300/200?random=1"
  },
  {
    id: 2,
    name: "Quantum Entanglement Module",
    description: "Enables ultra-secure quantum communication",
    price: 499999.99,
    image: "https://picsum.photos/300/200?random=2"
  },
  {
    id: 3,
    name: "Qubit Stabilizer Array",
    description: "Enhances qubit coherence time by 500%",
    price: 299999.99,
    image: "https://picsum.photos/300/200?random=3"
  },
  {
    id: 4,
    name: "Quantum Error Correction System",
    description: "Reduces quantum decoherence and improves computation accuracy",
    price: 749999.99,
    image: "https://picsum.photos/300/200?random=4"
  }
];

const Order = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Quantum Computer Products</h2>
      <p className="mb-8 text-gray-600">Explore our cutting-edge quantum computing solutions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quantumProducts.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Keranjang Belanja Floating */}
      {cart.length > 0 && (
        <div className="floating-cart">
          <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
          {cart.map(item => (
                       <div key={item.id} className="flex justify-between items-center mb-4">
                       <span>{item.name}</span>
                       <div>
                         <span className="mr-4">${item.price.toLocaleString()}</span>
                         <button
                           onClick={() => removeFromCart(item.id)}
                           className="text-red-500 hover:text-red-600"
                         >
                           Remove
                         </button>
                       </div>
                     </div>
                   ))}
                   <div className="mt-4 text-xl font-bold">
                     Total: ${getTotalPrice()}
                   </div>
                   <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300">
                     Proceed to Checkout
                   </button>
                 </div>
               )}
             </div>
           );
         };
         
         export default Order;
         
