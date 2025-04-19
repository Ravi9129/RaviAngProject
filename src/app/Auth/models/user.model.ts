export interface User {
    id: number;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    roles: string[];
    refreshToken?: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  
  export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    message?: string;
    success: boolean;
  }


