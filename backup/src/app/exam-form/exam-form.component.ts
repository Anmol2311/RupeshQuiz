import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exam } from '../exam';
import { Question } from '../question';
import { DataService } from 'src1/app/service/data.service';
import { Voucher } from '../voucher';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  // exam_data = [];

  studentName: string;
  exam: Exam[] = [];
  exam_list: Exam[] = [];
  exam_details = [];
  totalQue: number;
  duration: string;
  exmCode: string;
  totalMarks: number;
  data = [];
  ecode: string;
  ename: string;
  eid: number;
  voucherList: Voucher[];
  isVoucher: boolean = false;
  voucherError:boolean;
  // selectExam: boolean = false;
  constructor(private dataService: DataService, private _http: HttpClient, private router: Router) { }

  logout() {
    if (confirm('Are you sure you want to exit ?')) {
      this.dataService.isLogout();
    }
  }
  getExam(voucher) {
    this._http.get<Voucher[]>("http://localhost/quiz_api/selectActiveVoucher.php").subscribe(
      (res) => {
        this.voucherList = res;
        for(var i = 0; i < this.voucherList.length; i++){
          if(this.voucherList[i].voucherCode == voucher){
            this.isVoucher = true;
            this.voucherError = false;
          }
          else{
            this.voucherError = true;
          }
        }
      }
    );
  }
  get_details(ecode) {

    this.exmCode = ecode;
    for (let k = 0; k < this.exam_list.length; k++) {
      if (this.exam_list[k].examCode == this.exmCode) {
        this.ename = this.exam_list[k].examName;
        this.ecode = this.exam_list[k].examCode;
        sessionStorage.setItem('examName', this.ename);
        sessionStorage.setItem('examCode', this.ecode);
      }
    }
    this._http.post<Question[]>("http://localhost/quiz_api/selectQuestions.php", { 'examCode': this.ecode }).subscribe(
      (res) => {
        this.exam_details = res;
        console.log(this.exam_details);
        this.totalQue = this.exam_details.length;
        this.duration = "1 Hour";
        this.totalMarks = this.totalQue;

      }
    );

  }
  ngOnInit() {

    window.history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }

    this.studentName = sessionStorage.getItem('stdName');
    this._http.get<Exam[]>("http://localhost/quiz_api/selectAllExam.php").subscribe(
      (res) => {
        this.exam = res;
        for (var i = 0; i < this.exam.length; i++) {
          this.exam_list[i] = this.exam[i];
        }
        console.log(this.exam_list);
      }
    );
  }


}
