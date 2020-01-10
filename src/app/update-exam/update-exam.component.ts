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

  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  id: number;
  data: Exam[] = [];
  updateObj: Exam;
  examStatus: string[];
  back() {
    window.history.back();
  }
  updateExam(frm) {
    this.updateObj = {
      examID: this.id,
      examCode: frm.excode,
      examName: frm.exname,
      status: frm.exstatus
    }
    this._http.post("../../quiz_api/updateExam.php", this.updateObj, { responseType: 'text' }).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
  ngOnInit() {
    this.examStatus = ["enabled", "disabled"];
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this._http.post<Exam[]>("../../quiz_api/selectSingleExam.php", { 'examID': this.id }).subscribe(
      (res) => {
        this.data = res;
      }
    );
  }

}
