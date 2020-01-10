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
  // exmId:number;
  // exam_code:string;
  // exam_name:string;
  show:boolean = false;
  // updateform:boolean = false;
  examObj:object = {};
  // updateObj:object = {};
  term = "";
  p:any;
  examStatus:string[];
  fetchExam(){

    this._http.get<Exam[]>("http://localhost/quiz_api/selectAllExam.php").subscribe(
      (res)=> {
        this.data = res;
      }
    );
  }

  deleteExam(id){
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("http://localhost/quiz_api/deleteExam.php",{'examID':id}, { responseType: 'text' }).subscribe(
        () => {
          this.fetchExam();
        }
      );
    }
  }

  show_form(){
    this.show = true;
  }

  // showUpdate(id){
  //   this.updateform = true;
  //   this.exmId = id;
  //   this._http.get<Exam[]>("http://localhost:3000/Exam").subscribe(
  //     (res)=> {
  //       this.data = res;
  //       for(let i=0; i< this.data.length; i++){
  //         if(this.data[i].examID == this.exmId){
  //           this.exam_code = this.data[i].examCode;
  //           this.exam_name = this.data[i].examName;
  //         }
  //       }
  //     }
  //   );

  // }

  // updateExam(frm){
  //   this.updateObj = {
  //     exam_code: frm.excode,
  //     exam_name: frm.exname
  //   }

  //   const url = `${'http://localhost:3000/Exam'}/${frm.exid}`;
  //   this._http.put(url,JSON.stringify(this.updateObj),{headers:this.headers}).subscribe(
  //     () => {
  //       //this.router.navigate(['/']);
  //       alert('updated');
  //       this.updateform = false;
  //       this.fetchExam();
  //     }
  //   );
  // }
  addExam(frm){
    this.examObj = {
      examCode: frm.ecode,
      examName: frm.ename,
      status:frm.estatus
    }
    this._http.post("http://localhost/quiz_api/insertExam.php", this.examObj, { responseType: 'text' }).subscribe(
        () => {
          // this.router.navigate(['/']);
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
