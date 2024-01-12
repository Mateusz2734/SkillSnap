import { ReactNode, createContext } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

import {
  User,
  Credentials,
  PostAuthLoginResponse,
  GetAuthLogoutResponse,
} from "../types/types";
import api from "../api/api";

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthContextType = {
  user: User | null;
  logIn: (credentials: Credentials) => Promise<void>;
  logOut: () => void;
  token: string | null;
};

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useSessionStorage<User | null>("user", null);
  const [token, setToken] = useSessionStorage<string | null>("token", null);

  const logIn = async (credentials: Credentials) => {
    try {
      const { data } = await api.post<PostAuthLoginResponse>(
        "/auth/login",
        JSON.stringify(credentials)
      );

      setUser(data?.user);
      setToken(data?.authenticationToken);
    } catch (err) {
      console.error(err);
      toast.error("An error occured while logging in");
      setUser(null);
      setToken(null);
    }
  };

  const logOut = async () => {
    await api.get<GetAuthLogoutResponse>("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
