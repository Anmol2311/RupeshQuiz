import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../student';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  
  headers: HttpHeaders | { [header: string]: string | string[]; };
  
  constructor(private _http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:number;
  data:Student[] = [];
  // studObj:Student;
  resObj:Student;
  gender:string[];

  update(frm){
    this.resObj = {
      stdID:this.id,
      stdName: frm.sname,
      stdEmail: frm.semail,
      stdPassword: frm.password.spwd,
      stdContact: frm.scontact,
      stdGender: frm.sgender,
      stdEducation: frm.sedu,
      stdAnswer:frm.sans,
      stdBranches:frm.stdBranches
    }

    this._http.post("../../quiz_api/updateStudent.php", this.resObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  ngOnInit() {

    this.gender = ["Male","Female","Transgender"];

    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    
    this._http.post<Student[]>("../../quiz_api/selectSingleStudent.php",{'stdID':this.id}).subscribe(
        (res) => {
          this.data = res;
        }
      );
    
  }

}
