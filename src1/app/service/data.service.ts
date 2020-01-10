import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLogin(user){
    if(user == 'student'){
      return this.router.navigate(['/exam_form']);
    }
    else{
      return this.router.navigate(['/dashboard']);
    }
    
  }
  isLogout(){
    //sessionStorage.removeItem('uname');
    sessionStorage.clear();

    this.router.navigate(['/']);
  }
  constructor(private router:Router) { }
}
