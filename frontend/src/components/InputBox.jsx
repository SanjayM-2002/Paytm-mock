import React from 'react';

const InputBox = ({ label, placeholder, name, onChange, value }) => {
  return (
    <>
      <div>
        <div className='text-base font-semibold text-black py-2 text-left'>
          {label}
        </div>
        <input
          className='w-full px-2 py-1 border rounded border-slate-200'
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
};

export default InputBox;
