import React, { useEffect } from 'react';
import AppBar from '../components/AppBar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, []);
  return (
    <>
      <div>
        <AppBar />
        <div className='m-8'>
          <Balance />
          <Users />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
