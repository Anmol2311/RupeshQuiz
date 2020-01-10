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
      exam_code: frm.ecode,
      que: frm.que,
      opt1: frm.opt1,
      opt2: frm.opt2,
      opt3: frm.opt3,
      opt4: frm.opt4,
      ans: frm.ans
    }
    this._http.post("http://localhost:3000/Questions", this.queObj).subscribe(
      () => {
        alert("que added");
      }
    );
    this.myform.reset();
      this.myform.controls['ecode'].setValue(this.id);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['ecode'];
      }
    );

    console.log(this.id);
  }


}
