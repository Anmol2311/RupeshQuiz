import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // isLogin(user){
  //   if(user == 'student'){
  //     return this.router.navigate(['/exam_form']);
  //   }
  //   else if(){
  //     return this.router.navigate(['/dashboard']);
  //   }
    
  // }

  adminLogin(){
    return this.router.navigate(['/dashboard']);
  }

  studentLogin(){
    return this.router.navigate(['/exam_form']);
  }

  isLogout(){
    //sessionStorage.removeItem('uname');
   
    sessionStorage.clear();

    this.router.navigate(['/']);
    
  }
  constructor(private router:Router) { }
}
