import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exam } from '../exam';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.css']
})
export class ManageExamComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private _http: HttpClient) { }

  data:Exam[] = [];
  show:boolean = false;
  examObj:object = {};
  term = "";
  p:any;
  examStatus:string[];

  fetchExam(){
this._http.get<Exam[]>("../quiz_api/selectAllExam.php").subscribe(
      (res)=> {
        this.data = res;
      }
    );
  }

  deleteExam(id){
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("../quiz_api/deleteExam.php",{'examID':id}, { responseType: 'text' }).subscribe(
        (res) => {
          if(res){
          this.fetchExam();
        }
      }
      );
    }
  }


  show_form(){
    this.show = true;
  }


  addExam(frm){
    this.examObj = {
      examCode: frm.ecode,
      examName: frm.ename,
      status:frm.estatus
    }
    this._http.post("../quiz_api/insertExam.php", this.examObj, { responseType: 'text' }).subscribe(
        () => {
          this.show = false;
          this.fetchExam();
        }
      );
    }
  ngOnInit() {
    this.examStatus = ["enabled","disabled"];
    this.fetchExam();
  }

}
