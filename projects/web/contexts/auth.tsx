import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import useSWR, { mutate } from "swr";

import { api } from "../config/apis";
import { User } from "../models/user";

type ContextType = {
  user?: User
  authenticate(code: string): Promise<void>
};

export const AuthContext = createContext({} as ContextType);

export const AuthContextProvider: React.FC = ({ children }) => {
  const { data: user, mutate } = useSWR<User | undefined>("/auth", async () => {
    try {
      const response = await api.get<User>('/profile')
      return response.data
    } catch (error) {
      return undefined
    }
  });
  
  const { push, route } = useRouter()

  async function authenticate(code: string) {
    try {
      const { data } = await api.post<{
        token: string
        user: User
      }>("/auth", { code })
  
      localStorage.setItem("@devchat/token", data.token)
      api.defaults.headers.common.authorization = `Bearer ${data.token}`
  
      await mutate()
    } catch (error) {
      await mutate(undefined)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@devchat/token")

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
    }
  }, [])

  useEffect(() => {
    if(route.includes("home") && !user) {
      push('/')
    }

    if(!route.includes("home") && user) {
      push('/home')
    }
  }, [user, route, push])

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
