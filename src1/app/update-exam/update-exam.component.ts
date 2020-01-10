import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../exam';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };
  
  constructor(private _http: HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:number;
  data = [];
  exam_code:string;
  exam_name:string;
  updateObj:object = {};

  updateExam(frm){
    this.updateObj = {
      exam_code: frm.excode,
      exam_name: frm.exname
    }
    const url = `${"http://localhost:3000/Exam"}/${this.id}`;
    this._http.put(url,this.updateObj,{headers:this.headers}).subscribe(
      () => {
        alert('Exam updated successfully');
        this.router.navigate(['/manage_exam']);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res)=> {
        this.data = res;
        for(let i=0; i< this.data.length; i++){
          if(this.data[i].id == this.id){
            this.exam_code = this.data[i].exam_code;
            this.exam_name = this.data[i].exam_name;
			break;
          }
        }
      }
    );
  }

}
