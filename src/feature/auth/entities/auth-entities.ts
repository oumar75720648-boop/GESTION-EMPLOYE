export interface AuthRequest {
  email: string;
  motDePasse: string;
}

export interface Token {
  accessToken: string;
  refreshToken?: string;
  expiredAt: string;
}
