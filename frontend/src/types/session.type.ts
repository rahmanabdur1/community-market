

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface SessionState {
  session: Session | null;
  user: User | null;   
  isLoading: boolean;
  error: string | null;
  setSession: (session: Session, user: User) => void; 
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearSession: () => void;
  logout: () => void;
}
