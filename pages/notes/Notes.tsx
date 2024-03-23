import React from 'react'
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/src/hooks/reduxHook';
import { selectUser } from '@/slices/userSlice';
import HeaderPage from '@/src/components/HeaderMenu/HeaderPage';

const Notes = () => {
  const handleLogout = async () => {
    await signOut();
  };

  const user = useAppSelector(selectUser);
  console.log(user)

  return (
    <>
      <HeaderPage 
        titleHeader='Notas Rapidas'
      />
    </>
  );
};


export default Notes
 
