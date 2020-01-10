import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../admin';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  headers: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  id: number;
  data: Admin[] = [];
  adminObj: Admin;
  resObj: Admin;
  gender: string[];
  update(frm) {
    this.resObj = {
      admID: this.id,
      admName: frm.sname,
      admEmail: frm.semail,
      admPassword: frm.password.spwd,
      admContact: frm.scontact,
      admGender: frm.sgender,
      admAnswer: frm.sans
    }
    this._http.post("../../quiz_api/updateAdmin.php", this.resObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  ngOnInit() {
    this.gender = ["male", "female", "transgender"];
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this._http.post<Admin[]>("../../quiz_api/selectSingleAdmin.php", { 'admID': this.id }).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
      }
    );
  }
}
