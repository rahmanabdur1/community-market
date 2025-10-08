export interface User {
 id: string;
  name?: string;
  displayName: string;
  email: string;
  emailVerified?: boolean;
  roles: string[]; 
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string; 
  expiresAt: number;
  tokenType: string;
}

export interface SessionState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  lastActivity: number;

  setSession: (session: Session, user: User) => void;
  setUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearSession: () => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  initializeSession: () => void;

  isAuthenticated: boolean;
  requiresReauth: boolean;
}


