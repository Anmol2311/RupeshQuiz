import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Stud } from '../student';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  id:number;
  resObj: object = {};
  dataObj:object = {};
  user: string;
  email:string;
  sec_que: string[];
  frmres = [];
  data = [];
  data1 = [];
  showreset:boolean;
  showForget:boolean = true;
  constructor(private _http: HttpClient, private route: Router, private router: ActivatedRoute) { }

  result(frm) {
    //console.log(frm);
    //this.frmres = frm;
    if (this.user == 'student') {
      this._http.get<Stud[]>("http://localhost:3000/Student").subscribe(
        (res) => {
          this.data = res;
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email == frm.email && this.data[i].sec_ans == frm.sans) {
              this.email = frm.email;
              this.id = this.data[i].id;
             this.dataObj = this.data[i];
              this.showreset = true;
              this.showForget = false;
            }
          }
        }
      );
    }
    else {
      this._http.get<Stud[]>("http://localhost:3000/Admin").subscribe(
        (res) => {
          this.data = res;
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email == frm.email && this.data[i].sec_ans == frm.sans) {
              this.email = frm.email;
              this.id = this.data[i].id;              
              //this.dataObj = this.data[i];
              this.showreset = true;
              this.showForget = false;
            }
          }
        }
      );
    }
  }

  resetpass(frm1){

    console.log(this.dataObj['name']);
    // this.resObj = {
    //   name:this.dataObj['name'],
    //   email:this.dataObj['email']     
    //   password: frm1.password.spwd,
    //   sec_ans:this.dataObj['sec_ans'],
    //   mobile:this.dataObj['mobile']
    //   gender:
    //   edu:
    // }

    // if(this.user == 'student'){
    //   // this._http.get<Stud[]>("http://localhost:3000/Student").subscribe(
    //   //   (res) => {
    //   //     this.data1 = res;

    //   //   }
    //   // );
    //    const url = `${'http://localhost:3000/Student'}/${this.id}`;
    //    this._http.put(url, this.resObj , {headers:this.headers}).subscribe(
    //     (res) => {
    //       alert('Password changed successfully.');
    //     }
    //    );
    // }
    // else{
    //   const url = `${'http://localhost:3000/Admin'}/${this.id}`;
    //   this._http.put(url, this.resObj , {headers:this.headers}).subscribe(
    //    (res) => {
    //      alert('Password changed successfully.');
    //    }
    //   );
    // }
  }
  ngOnInit() {

    this.router.params.subscribe(
      params => {
        this.user = params['user'];
      }
    );
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
