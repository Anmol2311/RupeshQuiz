import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exam } from '../exam';
import { Question } from '../question';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  exam_data = [];
  exam = [];
  exam_list = [];
  exam_details = [];
  totalQue: number;
  duration: number;
  exmID: string;
  totalMarks: number;
  data = [];
  ecode:string;
  ename:string;
  selectExam: boolean = false;
  constructor(private _http: HttpClient, private router: Router) { }

  get_details(eid) {

    this.exmID = eid;

    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res) => {
        this.exam_data = res;
        for(let k=0; k<this.exam_data.length;k++){
          if(this.exam_data[k].exam_code == this.exmID){
            this.ename = this.exam_data[k].exam_name; 
            sessionStorage.setItem('exam', this.ename);           
          }
        }
      }
    );

    this.exam_details = [];
    this._http.get<Question[]>("http://localhost:3000/Questions").subscribe(
      (res) => {
        this.data = res;
        for (let j = 0; j < this.data.length; j++) {
          if (this.exmID == this.data[j].exam_code) {
           // console.log(this.data[j]);
            this.ecode = this.data[j].exam_code;
            this.exam_details.push(this.data[j]);
          }
        }

        sessionStorage.setItem('examid', this.ecode);
        this.totalQue = this.exam_details.length;
        this.duration = this.totalQue / 2;
        //this.duration = this.totalQue;  for 1 min per que
        this.totalMarks = this.totalQue * 2;
        
       // console.log(this.totalQue);
      }
    );

    //this.selectExam = false;
  }
  ngOnInit() {

    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res) => {
        this.exam = res;
        for (var i = 0; i < this.exam.length; i++) {
          //console.log(this.exam[i]);
          this.exam_list[i] = this.exam[i];
          //this.exam_details[i] = this.exam[i];

        }
        //console.log(this.exam_list);
      }
    );
  }


}
