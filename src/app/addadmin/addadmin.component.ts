import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  @ViewChild('frm') myform: NgForm;
  isLH:boolean;
  branches:string[];
  brancheshematite:string[];
  formModel:string;
  gender: string[];
  sec_que: string[];
  adminObj: object = {};

  constructor(private _http: HttpClient, private router: Router) { }
  // displayDropdown(){
  //   this.isLH = !this.isLH;
  // }
  back() {
    window.history.back();
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  register(frm) {
    console.log(frm);
    this.adminObj = {
      admName: frm.sname,
      admEmail: frm.semail,
      admPassword: frm.password.spwd,
      admContact: frm.scontact,
      admGender: frm.sgender,
     // admBranches:frm.lhbranches,
      stdAnswer: frm.sans
    }
    this._http.post("../quiz_api/insertAdmin.php", this.adminObj, { responseType: 'text' }).subscribe(
      () => {
        Swal.fire({
          position: 'top-middle',
          type: 'success',
          title: 'Register Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard']);
      }
    );
    this.myform.reset();
  }
  ngOnInit() {
    this.gender = ["Male", "Female", "Transgender"];
    // this.branches =["Aundh","Bhavanipeth","Hadapsar","Warje","Yerwada"];
    // this.brancheshematite =["Hematite"];
    this.sec_que = [
      "What is your favorite color?",
      "What is your favorite movie?",
      "What primary school did you attend?",
      "What is the name of your favorite pet?",
      "What is your father's middle name?",
      "Where is your favorite place to vacation?"
    ];
  }
}
