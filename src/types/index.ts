// Authentication types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  paper: string;
  is_active: boolean;
  created_at: string;
  login_only: TimeRanges;
}

export interface UserCreate {
    username: string;
    email: string;
    name: string;
    password: string;
    paper: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserCreate) => Promise<void>;
  logout: () => void;
  loading: boolean;
}