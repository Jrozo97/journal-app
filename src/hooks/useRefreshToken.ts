
import { useLazyRefeshTokenQuery } from '@/services/userApi';
import { useAppDispatch, useAppSelector } from './reduxHook';
import { selectUser, setUserState } from '@/slices/userSlice';

export const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();


  const [refeshToken] = useLazyRefeshTokenQuery();

  const refreshToken = async () => {
    try {
      const res = await refeshToken({ uid: user.uid, name: user.name });
      console.log(res.data);
      dispatch(setUserState(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  return refreshToken;
};