import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  formModel:string;
  isLH:boolean;
  
  @ViewChild('frm') myform: NgForm;
  
  gender: string[];
  branches:string[];
  brancheshematite:string[];
  sec_que: string[];
  studentObj: object = {};

  constructor(private _http: HttpClient, private router: Router) { }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  displayDropdown(){
    this.isLH = !this.isLH;
  }

  register(frm) {
    
    this.studentObj = {
      stdPnr:frm.spnr,
      stdName: frm.sname,
      stdEmail: frm.semail,
      stdPassword: frm.spwd,
      stdContact: frm.scontact,
      stdGender: frm.sgender,
      stdEducation: frm.sedu,
      stdBranches:frm.lhbranches,
      stdAnswer: frm.sans
    }
    this._http.post("quiz_api/insertStudent.php", this.studentObj, { responseType: 'text' }).subscribe(
      () => {
      
        Swal.fire({
          position: 'top-middle',
          type: 'success',
          title: 'Register Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        
        this.router.navigate(['/']);
      }
    );
    this.myform.reset();
  }
  ngOnInit() {
    this.gender = ["Male", "Female", "Transgender"];

    this.branches =["Aundh","Bhavanipeth","Hadapsar","Warje","Yerwada"];
    this.brancheshematite =["Hematite"];

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
