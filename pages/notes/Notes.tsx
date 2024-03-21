import React from 'react'
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/src/hooks/reduxHook';
import { selectUser } from '@/slices/userSlice';

const Notes = () => {
  const handleLogout = async () => {
    await signOut();
  };

  const user = useAppSelector(selectUser);
  console.log(user)

  return (
    <>
      <h1>Notes</h1>
      <button className=' bg-primary text-white rounded-md py-2 px-4' onClick={handleLogout}>Logout</button>
    </>
  );
};


export default Notes

