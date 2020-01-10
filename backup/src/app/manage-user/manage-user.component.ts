import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Student } from '../student';
import { Admin } from '../admin';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  isstudent:boolean = true;
  isadmin:boolean;
  exist:boolean = false;
  sdata:Student[] = [];
  adata:Admin[] = [];
  term = "";
  constructor(private _http: HttpClient) { }

  getStudent(){
    // this.exist = true;
    this.isstudent = true;
    // this.isadmin = false;    
    this._http.get<Student[]>("http://localhost/quiz_api/selectAllStudent.php").subscribe(
      (res) => {
      this.sdata = res;
      }
    );
    
  }
  deleteStud(id){
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("http://localhost/quiz_api/deleteStudent.php",{'stdID':id}, { responseType: 'text' }).subscribe(
        (res) => {
          if(res){
            this.getStudent();
          }
        }
      );
    }
  }

  getAdmin(){
    // this.exist = true;
    // this.isadmin = true;
    this.isstudent = false; 
    this._http.get<Admin[]>("http://localhost/quiz_api/selectAllAdmin.php").subscribe(
      (res) => {
      this.adata = res;
      }
    );
    
  }

  deleteAdmin(id){
    if (confirm('Are you sure you want to delete?')) {
      // const url = `${'http://localhost:3000/Admin'}/${id}`;
      this._http.post("http://localhost/quiz_api/deleteAdmin.php",{'admID':id}, { responseType: 'text' }).subscribe(
        () => {
          this.getAdmin();
        }
      );
    }
  }
  ngOnInit() {
    this.getStudent();
  }

}
