import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css']
})
export class ManageResultComponent implements OnInit {

  data:Result[] = [];
  term = "";
  p:any;
  constructor(private _http:HttpClient) { }

  ngOnInit() {

    this._http.get<Result[]>("http://localhost/quiz_api/selectAllResult.php").subscribe(
      (res) => {
        this.data = res;
      }
    );

  }

}
