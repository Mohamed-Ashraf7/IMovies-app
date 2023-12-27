import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, signOut,signInWithPopup } from 'firebase/auth';
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
      setUser(authUser);
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
     navigate("/*");
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};
  const value = useMemo(() => ({
    user, signOut: handleSignOut, signInWithGoogle
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
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
