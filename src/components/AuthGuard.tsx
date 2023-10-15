import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AuthGuardProps } from "../Interfaces";

const AuthGuard: React.FC<AuthGuardProps> = ({
  authenticatedComponent,
  unauthenticatedComponent,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);
  if (isAuthenticated) {
    return authenticatedComponent;
  } else {
    return unauthenticatedComponent;
  }
};

export default AuthGuard;
