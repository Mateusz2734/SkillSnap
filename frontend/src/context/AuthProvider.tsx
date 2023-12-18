import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext<AuthContextType | null>(null);

export type User = {
  id: number;
  username: string;
  role: string;
  discordUsername: string;
  createdAt: Date;
};

type Credentials = {
  username: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  logIn: (credentials: Credentials) => Promise<void>;
  logOut: () => void;
  token: string | null;
};

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logIn = async (credentials: Credentials) => {
    try {
      const response = await fetch("http://localhost:4444/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const res = await response.json();

      console.log(res);

      setUser(res.user);
      setToken(res.authenticationToken);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    }
  };

  const logOut = async () => {
    await fetch("http://localhost:4444/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
