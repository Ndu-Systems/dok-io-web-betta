import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CURRENT_USER } from '.';
import { LoginService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // if (localStorage.getItem(CURRENT_USER)) {
    //     return true;
    // }
    // this.router.navigate(['/']);
    // return false;
    const currentUser = this.loginService.currentUserValue;
    if (currentUser) {

      if (route.data.roles && route.data.roles.indexOf(currentUser.Role) === -1) {
        // role not authorised sor redirect to login page
        this.router.navigate(['/']);
        return false;
      }
      // authorised
      return true;

    }
      // not logged in so redirect to login page with return url.
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
