import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  @ViewChild('frm') myform: NgForm;

  // id:string;
  gender: string[];
  sec_que: string[];
  adminObj: object = {};

  constructor(private _http: HttpClient, private router: Router) { }
  back() {
    window.history.back();
  }
  register(frm) {
    console.log(frm);
    this.adminObj = {
      admName: frm.sname,
      admEmail: frm.semail,
      admPassword: frm.password.spwd,
      admContact: frm.scontact,
      admGender: frm.sgender,
      admAnswer: frm.sans
    }

    // if(frm.user == "student"){
    this._http.post("http://localhost/quiz_api/insertAdmin.php", this.adminObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
    // }
    // else{
    //   this._http.post("http://localhost:3000/admin", this.studentObj).subscribe(
    //   () => {
    //     alert("Admin added successfully");
    //   }
    // );
    // }

    this.myform.reset();
    // if(this.id == 'login'){
    //   this.route.navigate(['/']);
    // }
    // else
    // {
    //   this.route.navigate(['/manage_user']);
    // }


  }
  ngOnInit() {
    // this.router.params.subscribe(
    //   params => {
    //     this.id = params['id'];
    //   }
    // );
    this.gender = ["Male", "Female", "Transgender"];
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
