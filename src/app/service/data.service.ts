import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  adminLogin() {
    return this.router.navigate(['/dashboard']);
  }
  studentLogin() {
    return this.router.navigate(['/exam_form']);
  }
  isLogout() {

    // sessionStorage.clear();
    // this.router.navigate(['/']);
    Swal.fire({
      title: "Are you sure you want to logout ?",
      text: "Once click on OK, Your session will destroy",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) =>  {
      if (result.value)
       {
        Swal.fire({
         position: 'top-middle',
         text:"Logout Successfully",
         type: 'success',
         showConfirmButton: false,
         timer: 1500
                 });
                 sessionStorage.clear();
                 this.router.navigate(['/']);

        }
      })
  }
  constructor(private router: Router) { }
}
