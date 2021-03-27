
import { Container } from '../components/Container'
import { Landing } from '../components/CTA'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/auth/authSlice';
import { auth } from '../store/constants';

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((_user) => {
      dispatch(getCurrentUser());
    });
  }, []);

  return (
    <Container height="100vh">
      <Landing />
    </Container>
  )
}

export default Index
