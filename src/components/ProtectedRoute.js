import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthProvider';



export default function ProtectedRoute({ children }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, user]);

  return children;
}