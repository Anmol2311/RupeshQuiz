import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';
import { Exam } from '../exam';
import { CountdownComponent } from 'ngx-countdown';

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
  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  
  // notifyMsg()
  // {
  //   alert("Your Time Ramining is 10Min");
    // Swal.fire({
    //   title: 'Your time remaning 10 second',
    //   animation: true,
    //   customClass: 'animated tada',
    //   tshowConfirmButton: false,
    //   timer: 2500
    // })
  // }
  result(frm) {
    console.log(frm);
    this.q = frm;
    let i: number;
    // var maxid = 0;

    var keynames = Object.keys(this.q);
    console.log(keynames);
    console.log(this.ques[0].answer);
    console.log(this.q[keynames[0]]);

    for (i = 0; i < this.ques.length; i++) {
      for (let j = 0; j < keynames.length; j++) {
        if(this.ques[i].answer === this.q[keynames[j]]) {
          this.correct++;
          break;
        }
        // }else if(this.ques[i].answer !== this.q[keynames[j]]){
        //   this.correct--;
        //   break;
        // }
      }
      // break
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
      totalQue: this.totalQue,
      correctAns: this.correct,
      wrongAns: this.wrong,
      status: this.grade
    }
    console.log(this.resultObj);

    this._http.post("http://localhost/quiz_api/insertQuiz.php",this.resultObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/result']);
      }
    );
  }
  ngOnInit() {
    window.history.pushState(null,null,location.href);
    window.onpopstate = function(){
     history.go(1);
     }
     
    this.studentName = sessionStorage.getItem('stdName');
    //code for navigation key locks
    window.addEventListener("keydown", function(e)
    {
     // space and arrow keys
     if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) 
     {
         e.preventDefault();
     }
    }, false);
    //code for navigation key Ends
    this.route.params.subscribe(
      params => {
        this.ecode = params['ecode'];
      }
    );
    this._http.post<Question[]>("http://localhost/quiz_api/selectQuestions.php",{'examCode':this.ecode}).subscribe(
      (res) => {
        this.ques = res;
        // for (let i = 0; i < this.data.length; i++) {
        //   if (this.data[i].exam_code == this.ecode) {
        //     this.exist = true;
        //     this.ques.push(this.data[i]);
        //     //this.ques[i] = this.data[i];
        //   }
        //   else {
        //     this.exist = false;
        //   }
        // }
      }

    );
  }

}
