export type AuthUser = {
  id: string;
  email: string;
  createdAt?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type MeResponse = {
  user: AuthUser;
};
