// apps/frontend/services/auth-service.ts

/**
 * AuthService bertanggung jawab atas autentikasi user,
 * penyimpanan sesi ke `localStorage`, RBAC policy check,
 * serta pengiriman notifikasi logout ke seluruh plugin iframe.
 *
 * Mendukung mode produksi maupun mock.
 */

import { fetchUserByUsername, createUser } from './user.service';
import { isMockMode } from './mode';
import { API_BASE } from '../config/api-base';

import { canAccess } from '@mx-core/core/rbac/policy';
import { permToContext } from '@mx-core/core/rbac/perm-to-rbac';
import { roleGte } from '@mx-core/types';
import type { UserRole, Perm } from '@mx-core/types';
import toast from 'react-hot-toast';

/**
 * Struktur user yang disimpan di localStorage dan digunakan di seluruh frontend.
 */
export type AuthUser = {
  username: string;
  avatarUrl?: string;
  token: string;
  role?: UserRole;
};

/**
 * Kirim broadcast `postMessage` ke semua plugin iframe untuk memberitahu bahwa sesi telah logout.
 */
function clearPluginCache() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    iframe.contentWindow?.postMessage({ type: 'logout' }, '*');
  });
}

export class AuthService {
  private static KEY = 'auth_token_v1';
  private static USER = 'auth_user_v1';

  /**
   * Melakukan login user dan menyimpan data ke localStorage.
   * Mendukung mode mock dan produksi.
   *
   * @param username - Username user
   * @param password - Password user
   * @returns Promise yang menyelesaikan AuthUser
   * @throws Error jika login gagal
   */
  static async login(username: string, password: string): Promise<AuthUser> {
    if (isMockMode()) {
      const user = await fetchUserByUsername(username);
      if (!user || user.passwordHash !== password) {
        throw new Error('Login gagal (MOCK): username/password salah.');
      }

      const token = `mock-${user.username}-${Date.now()}`;
      const role = (user.role ?? 'Guest') as UserRole;

      const authUser: AuthUser = {
        username: user.username,
        avatarUrl: user.avatarUrl ?? '',
        role,
        token,
      };

      localStorage.setItem(this.KEY, token);
      localStorage.setItem(this.USER, JSON.stringify(authUser));
      window.dispatchEvent(new Event('auth:changed'));
      return authUser;
    }

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      let msg = 'Login gagal. Periksa kredensial Anda.';
      try {
        const j = await res.json();
        if (j?.message) msg = j.message;
      } catch {
        throw new Error(msg);
      }
    }

    const data = (await res.json()) as {
      username: string;
      avatarUrl?: string;
      role?: UserRole;
    };

    const token = `session-${data.username}-${Date.now()}`;
    const role = (data.role ?? 'Guest') as UserRole;

    const authUser: AuthUser = {
      username: data.username,
      avatarUrl: data.avatarUrl ?? '',
      role,
      token,
    };

    localStorage.setItem(this.KEY, token);
    localStorage.setItem(
      this.USER,
      JSON.stringify({
        username: authUser.username,
        avatarUrl: authUser.avatarUrl,
        role: authUser.role,
      })
    );

    window.dispatchEvent(new Event('auth:changed'));
    return authUser;
  }

  /**
   * Registrasi user baru (hanya berlaku di mode mock).
   *
   * @param user - Data user baru
   */
  static async register(user: {
    username: string;
    password: string;
    role?: UserRole;
    avatarUrl?: string;
  }) {
    await createUser({
      username: user.username,
      password: user.password,
      role: user.role ?? 'Guest',
      avatarUrl: user.avatarUrl,
    });
  }

  /**
   * Melakukan logout, menghapus sesi plugin di backend, membersihkan localStorage,
   * dan mengirim notifikasi ke plugin iframe.
   */
  static async logout() {
    const sessionId = localStorage.getItem('plugin_session_id');
    if (sessionId) {
      try {
        await fetch(`${API_BASE}/api/session/${sessionId}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.warn('Gagal hapus session ID:', err);
      }
    }

    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.USER);
    localStorage.removeItem('plugin_session_id');
    window.dispatchEvent(new Event('auth:changed'));
    clearPluginCache();

    toast.success('✅ Logout berhasil & session plugin dihapus.');
  }

  /**
   * Ambil token autentikasi dari localStorage.
   *
   * @returns Token string atau null jika tidak ditemukan
   */
  static getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  /**
   * Ambil data user dari localStorage (tanpa token).
   *
   * @returns Object user atau null jika tidak ditemukan atau parsing gagal
   */
  static getUser() {
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem(this.USER);
    if (!raw) return null;

    try {
      const j = JSON.parse(raw);
      const role = j.role ? (String(j.role) as UserRole) : undefined;
      return {
        username: j.username ?? 'Guest',
        avatarUrl: j.avatarUrl ?? '',
        role,
      };
    } catch {
      return null;
    }
  }

  /**
   * Ambil user lengkap beserta token dari localStorage.
   *
   * @returns Object AuthUser atau null jika tidak valid
   */
  static getUserWithToken(): AuthUser | null {
    const user = this.getUser();
    const token = this.getToken();
    return user && token ? { ...user, token } : null;
  }

  /**
   * Cek apakah user saat ini sudah login (berdasarkan token).
   *
   * @returns `true` jika ada token, `false` jika tidak
   */
  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Cek apakah user memiliki role tertentu (exact match).
   *
   * @param role - Role yang dicek
   * @returns `true` jika cocok, `false` jika tidak
   */
  static hasRole(role: UserRole): boolean {
    const u = this.getUser();
    return !!u?.role && u.role === role;
  }

  /**
   * Cek apakah user memiliki role minimal (menggunakan hirarki role).
   *
   * @param minRole - Role minimum yang dibutuhkan
   * @returns `true` jika user memiliki role yang sama atau lebih tinggi
   */
  static hasRoleAtLeast(minRole: UserRole): boolean {
    const u = this.getUser();
    if (!u?.role) return false;
    return roleGte(u.role, minRole);
  }

  /**
   * Evaluasi apakah user memiliki izin akses terhadap permission tertentu (RBAC).
   *
   * @param perm - Permission yang akan dicek
   * @returns `true` jika diizinkan, `false` jika tidak
   */
  static can(perm: Perm): boolean {
    const u = this.getUser();
    if (!u?.role) return false;

    const context = permToContext(perm, u.role);
    if (!context) return false;

    return canAccess(context);
  }
}
