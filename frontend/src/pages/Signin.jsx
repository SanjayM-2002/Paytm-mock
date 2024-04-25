import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';

const Signin = () => {
  return (
    <>
      <div className='flex justify-center bg-slate-500 h-screen'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-500 flex flex-col w-96 border rounded-md px-4 py-4'>
            <Heading label={'Signin'} />
            <SubHeading label={'Enter your credentials to signin'} />
            <InputBox label={'Username'} placeholder={'johndoe'} />
            <InputBox label={'Password'} placeholder={'Johndoe123'} />
            <PrimaryButton label={'Signin'} />
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
