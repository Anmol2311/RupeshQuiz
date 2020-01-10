import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';
import { Exam } from '../exam';
import { CountdownComponent } from 'ngx-countdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  @ViewChild('countdown') counter: CountdownComponent;
  ecode: string;
  data = [];
  ques = [];
  exam = [];
  q: object[] = [];
  correct: number = 0;
  wrong: number;
  totalQue: number;
  exist: boolean = true;
  ename: string;
  totalPercent: number;
  grade: string;
  resultObj: object = {};
  studentName: string;
  stdBranches:string;
  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  result(frm) {
    console.log(frm);
    this.q = frm;
    let i: number;
    var keynames = Object.keys(this.q);
    console.log(keynames);
    console.log(this.ques[0].answer);
    console.log(this.q[keynames[0]]);
    for (i = 0; i < this.ques.length; i++) {
      for (let j = 0; j < keynames.length; j++) {
        if (this.ques[i].answer === this.q[keynames[j]]) {
          this.correct++;
          break;
        }
      }
    }
    this.totalQue = this.ques.length;
    this.wrong = this.totalQue - this.correct;
    this.totalPercent = (this.correct / this.totalQue) * 100;
    if (this.totalPercent > 40) {
      this.grade = 'pass';
    } else {
      this.grade = 'fail';
    }
    this.resultObj = {
      stdName: sessionStorage.getItem('stdName'),
      examName: sessionStorage.getItem('examName'),
      stdBranches: sessionStorage.getItem('stdBranches'),
      totalQue: this.totalQue,
      correctAns: this.correct,
      wrongAns: this.wrong,
      status: this.grade
    }
    this._http.post("../quiz_api/insertQuiz.php", this.resultObj, { responseType: 'text' }).subscribe(
      () => {
        Swal.fire({
          position: 'top-middle',
          type: 'success',
          title: 'Thanks Your Result Submitted Successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/result']);

      }
    );
  }
  ngOnInit() {
    window.history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }
    this.studentName = sessionStorage.getItem('stdName');
    this.stdBranches = sessionStorage.getItem('stdBranches');


    window.addEventListener("keydown", function (e) {
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
    this.route.params.subscribe(
      params => {
        this.ecode = params['ecode'];
      }
    );
    this._http.post<Question[]>("../quiz_api/selectQuestions.php", { 'examCode': this.ecode }).subscribe(
      (res) => {
        this.ques = res;
      }
    );
  }
}
