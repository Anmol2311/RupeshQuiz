import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student';
import { DataService } from '../service/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Admin } from '../admin';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('frm') myForm: NgForm
  @ViewChild('frm1') myForm1: NgForm
  stdData: Student[] = [];
  admData: Admin[] = [];
  exist: boolean = true;
  adminExist: boolean = true;
  errorMessage: string = "Invalid username Or password";
  adminErrorMessage: string = "Invalid username Or password";
  user: string;
  modalRefS: BsModalRef;
  modalRefA: BsModalRef;
  myInterval = 2000;
  noPause = true;
  constructor(private modalService: BsModalService, private _http: HttpClient, private router: Router, private dataService: DataService) { }
  openStudentModal(student: TemplateRef<any>) {
    this.modalRefS = this.modalService.show(student);
  }

  openAdminModal(admin: TemplateRef<any>) {
    this.modalRefA = this.modalService.show(admin);
  }

  registerNow() {
    this.router.navigate(['/register']);
    this.modalRefS.hide();
  }

  studLogin(frm) {
    this._http.get<Student[]>("quiz_api/selectAllStudent.php").subscribe(
      (res) => {
        this.stdData = res;
        //console.log(this.stdData);
        for (var i = 0; i < this.stdData.length; i++) {
          if (this.stdData[i].stdEmail == frm.uemail && this.stdData[i].stdPassword == frm.upass) {
            
            Swal.fire({
              position: 'top-middle',
              type: 'success',
              title: 'Login Successfully !',
              showConfirmButton: false,
              timer: 1500
            })
            
            this.exist = true;
            sessionStorage.setItem('stdBranches', this.stdData[i].stdBranches);
            sessionStorage.setItem('stdName', this.stdData[i].stdName);
            this.dataService.studentLogin();
            this.modalRefS.hide();
            break;
          }
          else {
            this.exist = false;
          } 
        }
      }
    )
  }

  adminLogin(frm1) {
    this._http.get<Admin[]>("quiz_api/selectAllAdmin.php").subscribe(
      (res) => {
        this.admData = res;
        console.log(this.admData);
        for (var i = 0; i < this.admData.length; i++) {
          if (this.admData[i].admEmail == frm1.uemail && this.admData[i].admPassword == frm1.upass) {
            
            Swal.fire({
              position: 'top-middle',
              type: 'success',
              title: 'Login Successfully !',
              showConfirmButton: false,
              timer: 1500
            })

            this.adminExist = true;
            sessionStorage.setItem('uname', this.admData[i].admName);
            this.dataService.adminLogin();
            this.modalRefA.hide();
            break;

          }
          else {
            this.adminExist = false;
          }
        }
      }
    )
  }
 ngOnInit() {
    // this.dataService.isLogout();
    sessionStorage.clear();

  }
}
