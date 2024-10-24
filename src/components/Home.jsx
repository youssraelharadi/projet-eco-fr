import React from "react";
const Home = () => {
  

    return (
        <section className="h-screen flex flex-col justify-center items-center bg-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue dans notre boutique e-commerce</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
          Découvrez notre collection exclusive de produits de haute qualité. Profitez d'une expérience d'achat en ligne rapide et facile avec des promotions exceptionnelles.
        </p>
        <a href="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Explorer nos produits
        </a>
      </section>
        
    );
};

export default Home;
