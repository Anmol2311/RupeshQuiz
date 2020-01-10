import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  
  id: string;
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
  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  result(frm) {
    console.log(frm);
    this.q = frm;
    let i: number;
    var maxid = 0;

    var keynames = Object.keys(this.q);
    console.log(keynames);
    // this.ques.map(function (obj) {
    //   if (obj.id > maxid) maxid = obj.id;
    // });

    for (i = 0; i < this.ques.length; i++) {
      for (let j = 0; j < keynames.length; j++) {
        if (this.ques[i].ans == this.q[keynames[j]]) {
          this.correct++;
        }
      }
    }

    this.totalQue = this.ques.length;
    this.wrong = this.totalQue - this.correct;
    this.totalPercent = ((this.correct * 2) / (this.totalQue * 2)) * 100;

    if (this.totalPercent > 40) {
      this.grade = 'Pass';
    } else {
      this.grade = 'Fail';
    }

    this.resultObj = {
      student_name: sessionStorage.getItem('uname'),
      exam_name: sessionStorage.getItem('exam'),
      total_que: this.totalQue,
      correct_ans: this.correct,
      wrong_ans: this.wrong,
      exam_date: new Date(),
      result: this.grade
    }
    console.log(this.resultObj);

    this._http.post("http://localhost:3000/Result", this.resultObj).subscribe(
      () => {
        this.router.navigate(['/result']);
      }
    );
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['ecode'];
      }
    );
    this._http.get<Question[]>("http://localhost:3000/Questions").subscribe(
      (res) => {
        this.data = res;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].exam_code == this.id) {
            this.exist = true;
            this.ques.push(this.data[i]);
            //this.ques[i] = this.data[i];
          }
          else {
            this.exist = false;
          }
        }
      }

    );
  }

}
