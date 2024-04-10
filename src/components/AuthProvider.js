import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import User from './Types/User';
const AuthContext = createContext<User | null>(null);
let isSignedIn = 1;
export default function AuthProvider(isSignedIn, children ) {
  // Uses `isSignedIn` prop to determine whether or not to render a user
  const [user, setUser] = useState<User | null>(isSignedIn ? { id: 1 } : null);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};