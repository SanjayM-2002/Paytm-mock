import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';

const AppBar = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName');
  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    navigate('/signin');
  };

  return (
    <>
      <div className='shadow h-14 flex justify-between items-center md:px-10'>
        <Link to={'/dashboard'}>
          <div className='flex flex-col justify-center h-full ml-4 font-bold'>
            PayTM App
          </div>
        </Link>
        <div className='flex items-center justify-center gap-2'>
          <PrimaryButton label={'Sign Out'} onClick={handleSignout} />
          <div className='flex flex-col justify-center h-full mr-4'>
            {firstName}
          </div>
          <div className='rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2'>
            <div className='flex flex-col justify-center h-full text-xl'>
              {firstName[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
