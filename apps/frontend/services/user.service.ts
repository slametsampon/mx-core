// apps/frontend/services/user.service.ts

export async function fetchUserByUsername(username: string) {
  return {
    username,
    passwordHash: 'admin123', // plaintext hanya untuk mock
    role: 'admin',
    avatarUrl: `https://i.pravatar.cc/100?u=${username}`,
  };
}

export async function createUser(user: any) {
  return true; // simulasi sukses
}
