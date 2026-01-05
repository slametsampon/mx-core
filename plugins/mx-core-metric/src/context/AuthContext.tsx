// plugins/mx-core-metric/src/context/AuthContext.tsx

/**
 * @file AuthContext.tsx
 * @description
 * Context global untuk menyimpan dan menyediakan data user yang aktif di dalam plugin `mx-core-metric`.
 *
 * File ini menyediakan dua context:
 * - `AuthContext`: menyimpan informasi user aktif (username, role, avatar).
 * - `AuthSetterContext`: fungsi setter untuk mengubah user di context.
 *
 * Digunakan bersama dengan komponen `<AuthContextProvider />` yang menyuntikkan nilai context berdasarkan hasil postMessage atau session fallback.
 */

'use client';

import { createContext, useContext } from 'react';

/**
 * Tipe data user untuk konteks autentikasi dalam plugin.
 */
export type AuthContextUser = {
  username: string;
  role: string;
  avatarUrl?: string;
};

/**
 * Context untuk setter: fungsi untuk mengubah user.
 * Diisi oleh `<AuthContextProvider />`
 */
export const AuthSetterContext = createContext<
  (user: AuthContextUser | null) => void
>(() => {}); // default: noop

/**
 * Custom hook untuk mengakses fungsi setter dari AuthContext.
 * Umumnya dipakai di komponen seperti `AuthMessageListener`.
 *
 * @returns {(user: AuthContextUser | null) => void} Setter fungsi
 */
export const useAuthSetter = () => useContext(AuthSetterContext);

/**
 * Context utama untuk menyimpan user saat ini.
 * Bisa `null` jika belum login.
 */
export const AuthContext = createContext<AuthContextUser | null>(null);

/**
 * Custom hook untuk mendapatkan user aktif dari context.
 * Umumnya digunakan di UI seperti `UserInfoPlugin`.
 *
 * @returns {AuthContextUser | null} Informasi user aktif
 */
export const useAuthContext = () => useContext(AuthContext);
