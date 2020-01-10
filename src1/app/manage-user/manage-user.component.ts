import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Stud } from '../student';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  isstudent:boolean;
  isadmin:boolean;
  exist:boolean = false;
  sdata = [];
  adata = [];
  constructor(private _http: HttpClient) { }

  getStudent(){
    this.exist = true;
    this.isstudent = true;
    this.isadmin = false;    
    this._http.get<Stud[]>("http://localhost:3000/Student").subscribe(
      (res) => {
      this.sdata = res;
      }
    );
    
  }
  deleteStud(id){
    if (confirm('Are you sure you want to delete?')) {
      const url = `${'http://localhost:3000/Student'}/${id}`;
      this._http.delete(url, { headers: this.headers }).toPromise().then(
        () => {
          this.getStudent();
        }
      );
    }
  }

  getAdmin(){
    this.exist = true;
    this.isadmin = true;
    this.isstudent = false; 
    this._http.get<Stud[]>("http://localhost:3000/Admin").subscribe(
      (res) => {
      this.adata = res;
      }
    );
    
  }

  deleteAdmin(id){
    if (confirm('Are you sure you want to delete?')) {
      const url = `${'http://localhost:3000/Admin'}/${id}`;
      this._http.delete(url, { headers: this.headers }).toPromise().then(
        () => {
          this.getAdmin();
        }
      );
    }
  }
  ngOnInit() {
  }

}
