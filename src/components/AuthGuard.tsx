import React from "react";
import { useAuth } from "../context/AuthContext";
import { AuthGuardProps } from "../Interfaces";

const AuthGuard: React.FC<AuthGuardProps> = ({
  authenticatedComponent,
  unauthenticatedComponent,
}) => {
  const { user } = useAuth();
  return user ? authenticatedComponent : unauthenticatedComponent;
};

export default AuthGuard;
