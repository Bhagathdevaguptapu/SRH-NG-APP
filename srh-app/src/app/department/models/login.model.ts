export interface LoginRequest {
  email: string;
  password: string;
  role: 'admin' | 'employee' | 'department';
}

export interface LoginResponse {
  status: string;
  message: string;
}