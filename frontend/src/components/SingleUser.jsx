import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useNavigate } from 'react-router-dom';

const SingleUser = ({ user }) => {
  const navigate = useNavigate();
  const onPress = () => {
    navigate('/transfer?id=' + user._id + '&name=' + user.firstName);
  };
  return (
    <>
      <div className='flex justify-between'>
        <div className='flex flex-row align-middle justify-center'>
          <div className='rounded-full h-12 w-12 bg-yellow-200 flex justify-center mt-4 mr-2'>
            <div className='flex flex-col justify-center h-full text-xl'>
              {user.firstName[0].toUpperCase()}
            </div>
          </div>
          <div className='flex flex-col justify-center h-ful'>
            <div>
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center h-ful'>
          <PrimaryButton label={'Send Money'} onClick={onPress} />
        </div>
      </div>
    </>
  );
};

export default SingleUser;
