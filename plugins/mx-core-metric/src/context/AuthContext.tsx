// plugins/mx-core-metric/src/context/AuthContext.tsx

'use client';

import { createContext, useContext } from 'react';

export type AuthContextUser = {
  username: string;
  role: string;
  avatarUrl?: string;
};

export const AuthSetterContext = createContext<
  (user: AuthContextUser | null) => void
>(() => {});

export const useAuthSetter = () => useContext(AuthSetterContext);

export const AuthContext = createContext<AuthContextUser | null>(null);

export const useAuthContext = () => useContext(AuthContext);
