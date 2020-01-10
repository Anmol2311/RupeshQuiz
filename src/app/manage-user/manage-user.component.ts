import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../student';
import { Admin } from '../admin';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  isstudent: boolean = true;
  isadmin: boolean;
  exist: boolean = false;
  sdata: Student[] = [];
  adata: Admin[] = [];
  term = "";
  constructor(private _http: HttpClient) { }

  getStudent() {
    this.isstudent = true;
    this._http.get<Student[]>("../quiz_api/selectAllStudent.php").subscribe(
      (res) => {
        this.sdata = res;
      }
    );

  }
  deleteStud(id) {
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("../quiz_api/deleteStudent.php", { 'stdID': id }, { responseType: 'text' }).subscribe(
        (res) => {
          if (res) {
            this.getStudent();
          }
        }
      );
    }
  }

  getAdmin() {
    this.isstudent = false;
    this._http.get<Admin[]>("../quiz_api/selectAllAdmin.php").subscribe(
      (res) => {
        this.adata = res;
      }
    );
  }

  deleteAdmin(id) {
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("../quiz_api/deleteAdmin.php", { 'admID': id }, { responseType: 'text' }).subscribe(
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
