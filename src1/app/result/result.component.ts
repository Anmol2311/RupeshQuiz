import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  data:Result[] = [];
  resultObj:Result;
  constructor(private _http:HttpClient) { }


  ngOnInit() {
    this._http.get<Result[]>("http://localhost:3000/Result").subscribe(
      (res) => {
        this.data = res;

        this.resultObj = this.data.pop();
      }
    );

    sessionStorage.removeItem('exam');
    sessionStorage.removeItem('examid');
  }

}
