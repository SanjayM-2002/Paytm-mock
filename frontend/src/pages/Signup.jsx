import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <>
      <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-200 w-96 pt-2 pb-2 pl-2 pr-2 mt-2 mb-2 ml-2 mr-2 rounded-md flex flex-col justify-center'>
            <Heading label={'Signup'} />
            <SubHeading
              label={'Enter your information to create your account'}
            />
            <InputBox label={'First Name'} placeholder={'John'} />
            <InputBox label={'Last Name'} placeholder={'Doe'} />
            <InputBox label={'Username'} placeholder={'johndoe'} />
            <InputBox label={'Password'} placeholder={'JohnDoe123'} />
            <PrimaryButton label={'Signup'} />
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
