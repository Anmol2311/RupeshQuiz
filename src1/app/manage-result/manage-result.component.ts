import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css']
})
export class ManageResultComponent implements OnInit {

  data = [];
  term = "";
  p:any;
  constructor(private _http:HttpClient) { }

  ngOnInit() {

    this._http.get<Result[]>("http://localhost:3000/Result").subscribe(
      (res) => {
        this.data = res;
        
      }
    );

  }

}
