import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  roles: string[];
}

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  @Input() appRole: string[] = [];
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getAccessToken();
    
    if (!token) {
      this.viewContainer.clear();
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userRoles = decoded.roles;
      const hasRole = userRoles && this.appRole.some(role => userRoles.includes(role));

      if (hasRole && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!hasRole && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    } catch (error) {
      this.viewContainer.clear();
    }
  }
}