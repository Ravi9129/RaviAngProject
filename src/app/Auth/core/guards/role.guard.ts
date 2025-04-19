import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoles = route.data['roles'] as Array<string>;
    const token = this.tokenService.getAccessToken();

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userRoles = decoded.roles;

      if (!userRoles || !expectedRoles.some(role => userRoles.includes(role))) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (error) {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}