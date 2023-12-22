import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
