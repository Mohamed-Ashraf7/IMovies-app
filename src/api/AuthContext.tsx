import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut,signInWithPopup, } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { User, AuthContextType } from "../Interfaces";

import { auth, googleProvider } from "../firebase";
const initialAuthContext: AuthContextType = {
  user: null,
  signOut: async () => { },
  signInWithGoogle:async()=>{},
};
const AuthContext = createContext<AuthContextType>(initialAuthContext);
interface AuthProviderProps {
  children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setUser({
        uid: authUser.uid,
        displayName: authUser.displayName,
        email: authUser.email,
      });
    } else {
      setUser(null);
    }
  });
  return () => unsubscribe();
}, []);

const handleSignOut = async () => {
      await signOut(auth);
      navigate("/*");
  };
 const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <AuthContext.Provider value={{ user, signOut: handleSignOut,signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
