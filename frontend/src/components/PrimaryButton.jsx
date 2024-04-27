import React from 'react';

const PrimaryButton = ({ label, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        type='button'
        className='w-full text-white bg-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-gray-300 mt-4 mb-4 px-5 py-3 font-semibold text-base border rounded '
      >
        {label}
      </button>
    </>
  );
};

export default PrimaryButton;
