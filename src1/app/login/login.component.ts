import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Stud } from '../student';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('frm') myForm: NgForm
  exist: boolean = true;
  errorMsg: string = "Invalid username or password";
  data = [];
  isStud: boolean = true;
  isAdmin: boolean;
  user: string;
  constructor(private _http: HttpClient, private router: Router, private dataService: DataService) { }

  showStud() {
    this.isStud = true;
    this.isAdmin = false;
    this.user = 'student';
  }
  showAdmin() {
    this.isAdmin = true;
    this.isStud = false;
    this.user = 'admin';
  }
  studLogin(frm) {
    this._http.get<Stud[]>("http://localhost:3000/Student").subscribe(
      (res) => {
        this.data = res;
        //console.log(this.data);
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].email == frm.uname && this.data[i].password == frm.upass) {
            sessionStorage.setItem('uname', this.data[i].name);
            sessionStorage.setItem('user', this.user);
            this.dataService.isLogin(this.user);
            this.exist = true;
          }
          else {
            this.exist = false;
            this.myForm.reset();
          }
        }
      }
    );
  }
  adminLogin(frm1) {
    this._http.get<Stud[]>("http://localhost:3000/Admin").subscribe(
      (res) => {
        this.data = res;
        //console.log(this.data);
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].email == frm1.auname && this.data[i].password == frm1.aupass) {
            // localStorage.setItem('uname',frm.uname);
            sessionStorage.setItem('uname', this.data[i].name);
            sessionStorage.setItem('user', this.user);
            this.dataService.isLogin(this.user);
            this.exist = true;
          }
          else {
            this.exist = false;
            this.myForm.reset();
          }
        }
      }
    )
  }

  ngOnInit() {

    this.dataService.isLogout();
  }

}
