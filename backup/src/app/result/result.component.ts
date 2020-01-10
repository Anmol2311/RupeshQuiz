import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';
import { DataService } from '../service/data.service';
import { Question } from '../question';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  studentName:string;
  data: Result[] = [];
  resultObj: Result;
  isResult:boolean = true;
  ques: Question[];

  constructor(private _http: HttpClient, private dataService: DataService) { }

  reviewQue(){
    this.isResult = false;
  }
  logout() {
    if (confirm("Are you sure you want to exit ?")) {
      this.dataService.isLogout();
    }

  }

  ngOnInit() {
    this.studentName = sessionStorage.getItem('stdName');
    this._http.get<Result[]>("http://localhost/quiz_api/selectSingleResult.php").subscribe(
      (res) => {
        this.data = res;
        // console.log(this.data);

        // this.resultObj = this.data[0];
      }
    );

    this._http.post<Question[]>("http://localhost/quiz_api/selectQuestions.php",{'examCode':sessionStorage.getItem('examCode')}).subscribe(
      (res) => {
        this.ques = res;
      }

    );
   
    //back button disabled
    window.history.pushState(null,null,location.href);
    window.onpopstate = function(){
     history.go(1);
     }

    // sessionStorage.removeItem('examName');
    // sessionStorage.removeItem('examCode');
  }

}
