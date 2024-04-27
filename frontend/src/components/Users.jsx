import React, { useEffect, useState } from 'react';
import SingleUser from './SingleUser';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        'http://localhost:5001/api/v1/users/bulk?filter=' + filter,
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        }
      );
      const data = res.data;
      console.log('response is: ', res.data);
      setUsers(data.user);
    };
    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='mt-4 mb-10'>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type='text'
          placeholder='Search users...'
          className='w-full px-2 py-1 border rounded border-slate-200'
        ></input>
      </div>
      <div>
        {users.map((u) => (
          <SingleUser key={u._id} user={u} />
        ))}
      </div>
    </>
  );
};

export default Users;
