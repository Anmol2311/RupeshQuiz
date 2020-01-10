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
  data:Question[] = [];
  quelist: Question;
  updateObj: Question;

  updateQue(frm) {
    console.log(frm);

    this.updateObj = {
      id: this.id,
      exam_code: frm.ecode,
      que: frm.que,
      opt1: frm.opt1,
      opt2: frm.opt2,
      opt3: frm.opt3,
      opt4: frm.opt4,
      ans: frm.ans
    }

    const url = `${'http://localhost:3000/Questions'}/${this.id}`;
    this._http.put(url, this.updateObj, {headers:this.headers}).subscribe(
      () => {
        alert('Question updated successfully');
        this.router.navigate(['/manage_que_ans']);
      }
    );
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this._http.get<Question[]>("http://localhost:3000/Questions").subscribe(
      (res) => {
        this.data = res;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id == this.id) {
            this.quelist = this.data[i];
            break;
          }
        }
      }
    );
  }

}
