import React from 'react';

const SubHeading = ({ label }) => {
  return (
    <>
      <div className='font-semibold text-lg text-gray-600 text-center'>
        {label}
      </div>
    </>
  );
};

export default SubHeading;
