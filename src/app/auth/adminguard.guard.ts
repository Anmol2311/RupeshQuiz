import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  canActivate():boolean {
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
