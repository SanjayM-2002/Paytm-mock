import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');
  const headers = { authorization: 'Bearer ' + token };
  useEffect(() => {
    const getBalance = async () => {
      const res = await axios.get(
        'http://localhost:5001/api/v1/account/balance',
        { headers }
      );
      const data = res.data;
      console.log(res);
      setBalance(data.message);
    };
    getBalance();
  }, []);
  return (
    <>
      <div className='flex'>
        <div className='font-bold text-lg'>Your balance</div>
        <div className='font-semibold ml-4 text-lg'>Rs {balance}</div>
      </div>
    </>
  );
};

export default Balance;
