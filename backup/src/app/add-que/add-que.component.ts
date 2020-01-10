import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.css']
})
export class AddQueComponent implements OnInit {

  @ViewChild('frm') myform:NgForm;
  
  id: string;
  exmID: number;
  queObj: object = {};

  headers: HttpHeaders | { [header: string]: string | string[]; };
  
  exam = [];
  exam_list = [];
  selectedExam = [];
  ecode: string;
  ename: string;

  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  addQue(frm) {
    console.log(frm);
    this.queObj = {
      examCode: frm.ecode,
      queName: frm.que,
      option1: frm.opt1,
      option2: frm.opt2,
      option3: frm.opt3,
      option4: frm.opt4,
      answer: frm.ans
    }
    this._http.post("http://localhost/quiz_api/insertQuestion.php", this.queObj, { responseType: 'text' }).subscribe(
        () => {
          sessionStorage.removeItem('examCode');
          this.router.navigate(['/dashboard/manage_que_ans']);
        }
      );
    // this._http.post("http://localhost:3000/Questions", this.queObj).subscribe(
    //   () => {
    //     alert("que added");
    //   }
    // );
    // this.myform.reset();
    //   this.myform.controls['ecode'].setValue(this.id);
  }

  ngOnInit() {
    // this.route.params.subscribe(
    //   params => {
    //     this.id = params['ecode'];
    //   }
    // );
    this.id = sessionStorage.getItem('examCode');
    console.log(this.id);
  }


}
