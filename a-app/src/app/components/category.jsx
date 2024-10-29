import React from 'react';

const CategoryCard = ({ title, onClick }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full px-4 py-2 border-2 border-yellow-950 cursor-pointer 
                 hover:bg-yellow-100 transition duration-200 ease-in-out
                 md:px-6 md:py-3"
      onClick={onClick}
    >
      <span className="text-black text-base font-semibold md:text-lg 
                      whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
