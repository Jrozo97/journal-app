import { useLazyRefeshTokenQuery } from '@/services/journalApi';
import { useAppDispatch, useAppSelector } from './reduxHook';
import { selectUser, setUserState } from '@/slices/userSlice';
import { Dispatch, SetStateAction } from 'react';

export const useRefreshToken = (setIsRefreshingToken: Dispatch<SetStateAction<boolean>>) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [refeshToken] = useLazyRefeshTokenQuery();

  const refreshToken = async () => {
    try {
      setIsRefreshingToken(true);
      const res = await refeshToken({ uid: user.uid, name: user.name });
      dispatch(setUserState(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshingToken(false);
    }
  };

  return refreshToken;
};