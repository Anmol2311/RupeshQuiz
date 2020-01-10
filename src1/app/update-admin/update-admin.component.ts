import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stud } from '../student';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  
  constructor(private _http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:number;
  data:Stud[] = [];
  studObj:Stud ;
  resObj:Stud;
  gender:string[];

  update(frm){
    this.resObj = {
      id:this.id,
      name: frm.sname,
      email: frm.semail,
      password: frm.password.spwd,
      sec_ans:frm.sans,
      mobile: frm.scontact,
      gender: frm.sgender,
      edu: frm.sedu
    }

    const url = `${'http://localhost:3000/Admin'}/${this.id}`;
    this._http.put(url, this.resObj, {headers: this.headers}).subscribe(
      (res) => {
        alert('Admin details updated successfully.');
        this.router.navigate(['/manage_user']);
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

    this._http.get<Stud[]>("http://localhost:3000/Admin").subscribe(
      (res) => {
        this.data = res;

        for(let i=0; i< this.data.length; i++){
          if(this.data[i].id == this.id){
            this.studObj = this.data[i];
          }
        }
      }
    );
  }

}
