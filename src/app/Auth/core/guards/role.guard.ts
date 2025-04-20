import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // 1. Get required roles from route data
    const requiredRoles = route.data['roles'] as string[];
    
    // 2. Get current user from token service
    const currentUser = this.tokenService.getUser();
    
    // 3. If no user or no roles, redirect to login
    if (!currentUser || !currentUser.roles) {
      return this.router.createUrlTree(['/auth/login']);
    }
    
    // 4. Check if user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role => 
      currentUser.roles.includes(role)
    );
    
    // 5. Return true if authorized, otherwise redirect to home
    return hasRequiredRole ? true : this.router.createUrlTree(['/']);
  }
}