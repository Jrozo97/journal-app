import React from 'react'
import { signOut } from 'next-auth/react';

const Notes = () => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <h1>Notes</h1>
      <button className=' bg-primary text-white rounded-md py-2 px-4' onClick={handleLogout}>Logout</button>
    </>
  );
};


export default Notes

