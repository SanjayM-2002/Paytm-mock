import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    console.log('formdata is: ', formData);
    const res = await axios.post(
      'http://localhost:5001/api/v1/users/signup',
      formData
    );
    console.log('response from backend is: ', res.data);
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('firstName', data.message.firstName);

    navigate('/dashboard');
  };
  return (
    <>
      <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-200 w-96 pt-2 pb-2 pl-2 pr-2 mt-2 mb-2 ml-2 mr-2 rounded-md flex flex-col justify-center'>
            <Heading label={'Signup'} />
            <SubHeading
              label={'Enter your information to create your account'}
            />
            <InputBox
              label={'First Name'}
              placeholder={'John'}
              name={'firstName'}
              onChange={handleInput}
              value={formData.firstName}
            />
            <InputBox
              label={'Last Name'}
              placeholder={'Doe'}
              name={'lastName'}
              onChange={handleInput}
              value={formData.lastName}
            />
            <InputBox
              label={'Username'}
              placeholder={'johndoe'}
              name={'username'}
              onChange={handleInput}
              value={formData.username}
            />
            <InputBox
              label={'Password'}
              placeholder={'JohnDoe123'}
              name={'password'}
              onChange={handleInput}
              value={formData.password}
            />
            <PrimaryButton label={'Signup'} onClick={submitForm} />
            <Footer
              label={'Already have an account?'}
              buttonText={'Signin'}
              to={'/signin'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
