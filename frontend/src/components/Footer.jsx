import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ label, buttonText, to }) => {
  return (
    <>
      <div className='flex flex-row gap-1'>
        <div className='text-base font-medium text-gray-800'>{label}</div>
        <Link
          className='underline cursor-pointer pointer pl-0.5 font-bold text-black'
          to={to}
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};

export default Footer;
