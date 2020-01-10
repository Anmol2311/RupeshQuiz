import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate():boolean {
    if (!!sessionStorage.getItem('stdName')) {
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
