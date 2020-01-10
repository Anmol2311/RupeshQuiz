import { Component, OnInit, TemplateRef } from '@angular/core';
import { Exam } from '../exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-que-ans',
  templateUrl: './manage-que-ans.component.html',
  styleUrls: ['./manage-que-ans.component.css']
})
export class ManageQueAnsComponent implements OnInit {

  modalRef: BsModalRef;
  headers: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private router: Router, private _http: HttpClient, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  data = [];
  exam = [];
  exam_list = [];
  exam_details = [];
  exmCode: string;
  question: Question[];
  show: boolean = false;
  queObj: object = {};
  ecode: string;

  get_details(eid) {
    this.exmCode = eid;
    sessionStorage.setItem('examCode', this.exmCode);

    console.log(this.exmCode);
    this._http.post<Question[]>("../quiz_api/selectQuestions.php", { 'examCode': this.exmCode }).subscribe(
      (res) => {
        this.question = res;
      }
    );
    if (this.exmCode == '') {
      this.show = false;
    }
    else {
      this.show = true;
    }
  }
  deleteQue(id) {
    if (confirm('Are you sure you want to delete?')) {
      this._http.post("../quiz_api/deleteQuestion.php", { 'queID': id }, { responseType: 'text' }).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }
  }
  fetchExam() {
    this._http.get<Exam[]>("../quiz_api/selectActiveExam.php").subscribe(
      (res) => {
        this.exam_list = res;
      }
    );
  }
  ngOnInit() {
    this.fetchExam();
  }
}
