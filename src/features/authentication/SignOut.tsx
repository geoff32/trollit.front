import { useAppDispatch } from '../../app/hooks';
import { signOutAsync } from './authenticationSlice';
import { Loading } from '../../components';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export function SignOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signOutAsync());
    navigate("/signin");
  }, [dispatch, navigate])
  
  return <Loading />
}