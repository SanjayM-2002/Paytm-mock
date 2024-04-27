import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    const res = await axios.post(
      'http://localhost:5001/api/v1/users/signin',
      formData
    );
    console.log('response from backend is: ', res.data);
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('firstName', data.firstName);

    navigate('/dashboard');
  };
  return (
    <>
      <div className='flex justify-center bg-slate-500 h-screen'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-500 flex flex-col w-96 border rounded-md px-4 py-4'>
            <Heading label={'Signin'} />
            <SubHeading label={'Enter your credentials to signin'} />
            <InputBox
              label={'Username'}
              placeholder={'johndoe'}
              value={formData.username}
              onChange={handleInput}
              name={'username'}
            />
            <InputBox
              label={'Password'}
              placeholder={'Johndoe123'}
              value={formData.password}
              onChange={handleInput}
              name={'password'}
            />
            <PrimaryButton label={'Signin'} onClick={submitForm} />
            <Footer
              label={'Dont have an account?'}
              buttonText={'Create an account'}
              to={'/signup'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
