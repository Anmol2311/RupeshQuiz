import { Component, OnInit, TemplateRef } from '@angular/core';
import { Exam } from '../exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';


@Component({
  selector: 'app-manage-que-ans',
  templateUrl: './manage-que-ans.component.html',
  styleUrls: ['./manage-que-ans.component.css']
})
export class ManageQueAnsComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private _http: HttpClient) { }

  exam = [];
  exam_list = [];
  exam_details = [];
  exmID: string;
  question  = [];
  show: boolean;
  queObj: object = {};
  ecode:string;

  get_details(eid) {
    this.exmID = eid;
    this.question = [];
    this._http.get<Question[]>("http://localhost:3000/Questions").subscribe(
      (res) => {
        this.exam_details = res;
        //console.log(this.exam_details);
        for (let j = 0; j < this.exam_details.length; j++) {
          if (this.exmID == this.exam_details[j].exam_code) {
            this.ecode = this.exam_details[j].exam_code;
            this.question.push(this.exam_details[j]);
          }
        }
      }
    );
    this.show = false;
  }

  deleteQue(id){
    if (confirm('Are you sure you want to delete?')) {
      const url = `${'http://localhost:3000/Questions'}/${id}`;
      this._http.delete(url, { headers: this.headers }).toPromise().then(
        () => {
          this.fetchExam();
        }
      );
    }
  }
  fetchExam(){
    this.show = true;
    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res) => {
        this.exam = res;
        for (var i = 0; i < this.exam.length; i++) {
          this.exam_list[i] = this.exam[i];
        }
      }
    );
  }
  ngOnInit() {
    this.fetchExam();
  }

}
