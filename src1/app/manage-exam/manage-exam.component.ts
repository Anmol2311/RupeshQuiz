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

  data = [];
  exmId:number;
  exam_code:string;
  exam_name:string;
  show:boolean = false;
  updateform:boolean = false;
  examObj:object = {};
  updateObj:object = {};
  term = "";
  p:any;

  fetchExam(){

    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res)=> {
        this.data = res;
      }
    );
  }

  deleteExam(id){
    if (confirm('Are you sure you want to delete?')) {
      const url = `${'http://localhost:3000/Exam'}/${id}`;
      this._http.delete(url, { headers: this.headers }).toPromise().then(
        () => {
          this.fetchExam();
        }
      );
    }
  }

  show_form(){
    this.show = true;
  }

  showUpdate(id){
    this.updateform = true;
    this.exmId = id;
    this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
      (res)=> {
        this.data = res;
        for(let i=0; i< this.data.length; i++){
          if(this.data[i].id == this.exmId){
            this.exam_code = this.data[i].exam_code;
            this.exam_name = this.data[i].exam_name;
          }
        }
      }
    );

  }

  updateExam(frm){
    this.updateObj = {
      exam_code: frm.excode,
      exam_name: frm.exname
    }

    const url = `${'http://localhost:3000/Exam'}/${frm.exid}`;
    this._http.put(url,JSON.stringify(this.updateObj),{headers:this.headers}).subscribe(
      () => {
        //this.router.navigate(['/']);
        alert('updated');
        this.updateform = false;
        this.fetchExam();
      }
    );
  }
  addExam(frm){
    this.examObj = {
      exam_code: frm.ecode,
      exam_name: frm.ename
    }
    this._http.post("http://localhost:3000/Exam", this.examObj).subscribe(
      () => {
        alert("exam added");
        this.show = false;
        this.fetchExam();
      }
    );
    
  }
  ngOnInit() {
    this.fetchExam();
  }

}
