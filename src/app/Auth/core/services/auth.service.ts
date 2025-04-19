import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginResponse, RegisterUser, User } from '../../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl || 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.get<User[]>(`${this.API_URL}/users?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error('Invalid credentials');
        }
        const user = users[0];
        return {
          accessToken: `fake-jwt-token-${user.id}`,
          refreshToken: user.refreshToken || `refresh-token-${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
          }
        };
      }),
      tap((response) => {
        this.tokenService.setAccessToken(response.accessToken);
        this.tokenService.setRefreshToken(response.refreshToken);
        this.tokenService.setUser(response.user);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterUser): Observable<User> {
    const newUser = {
      ...userData,
      roles: ['user'],
      refreshToken: `refresh-token-${Date.now()}`
    };

    return this.http.post<User>(`${this.API_URL}/users`, newUser).pipe(
      tap((user) => {
        // Auto-login after registration
        const loginResponse: LoginResponse = {
          accessToken: `fake-jwt-token-${user.id}`,
          refreshToken: user.refreshToken || `refresh-token-${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles || ['user']
          }
        };
        this.tokenService.setAccessToken(loginResponse.accessToken);
        this.tokenService.setRefreshToken(loginResponse.refreshToken);
        this.tokenService.setUser(loginResponse.user);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.tokenService.clearTokens();
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // Mock refresh token flow for JSON Server
    return this.http.get<User[]>(`${this.API_URL}/users?refreshToken=${refreshToken}`).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error('Invalid refresh token');
        }
        const user = users[0];
        return {
          accessToken: `fake-jwt-token-${user.id}`,
          refreshToken: user.refreshToken || `refresh-token-${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
          }
        };
      }),
      tap((response) => {
        this.tokenService.setAccessToken(response.accessToken);
        this.tokenService.setRefreshToken(response.refreshToken);
      }),
      catchError((error) => {
        console.error('Refresh token error:', error);
        this.tokenService.clearTokens();
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const userId = this.tokenService.getUser()?.id;
    if (!userId) {
      return throwError(() => new Error('No user logged in'));
    }
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }
}