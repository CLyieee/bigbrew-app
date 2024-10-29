import React from 'react';

const ProductCard = ({ image, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-100 border-2 border-orange-900 rounded-lg p-3 flex flex-col items-center shadow-lg cursor-pointer 
                 transition duration-200 ease-in-out hover:shadow-xl"
    >
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-32 h-32 md:w-40 md:h-40 object-cover mb-3 rounded-md" // Adjusted image size for mobile
      />
      
      {/* Product Title */}
      <span className="text-orange-900 text-sm font-medium md:text-lg mt-1 truncate">
        {title}
      </span>
    </div>
  );
};

export default ProductCard;
