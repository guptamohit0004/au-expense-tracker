import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { authenticationService } from './services/authentication';

@Injectable()
export class ProtectedRoute implements CanActivate, CanActivateChild {
  constructor(
    private authenticationServiceHelper: authenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationServiceHelper.currentUserValue) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationServiceHelper.currentUserValue) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
