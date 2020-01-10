import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-update-que',
  templateUrl: './update-que.component.html',
  styleUrls: ['./update-que.component.css']
})
export class UpdateQueComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  id: number;
  data:Question[];
  // quelist: Question;
  updateObj: Question;

  back(){
    window.history.back();
  }
  updateQue(frm) {
    console.log(frm);

    this.updateObj = {
      queID: this.id,
      examCode: frm.ecode,
      queName: frm.que,
      option1: frm.opt1,
      option2: frm.opt2,
      option3: frm.opt3,
      option4: frm.opt4,
      answer: frm.ans
    }

    this._http.post("http://localhost/quiz_api/updateQuestion.php", this.updateObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/dashboard/manage_que_ans']);
      }
    );

    // const url = `${'http://localhost:3000/Questions'}/${this.id}`;
    // this._http.put(url, this.updateObj, {headers:this.headers}).subscribe(
    //   () => {
    //     alert('Question updated successfully');
    //     this.router.navigate(['/manage_que_ans']);
    //   }
    // );
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this._http.post<Question[]>("http://localhost/quiz_api/selectSingleQuestion.php",{'queID':this.id}).subscribe(
      (res) => {
        this.data = res;
      }
    );
  }

}
