import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!!sessionStorage.getItem('uname')) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      alert('Access Denied');
      return false;
    }
  }
  
  constructor(private router: Router) { }
}
