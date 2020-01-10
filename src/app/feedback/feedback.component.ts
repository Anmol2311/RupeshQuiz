import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackObject:object = {};

  @ViewChild('frm') myform: NgForm;
  
  constructor(private _http:HttpClient,private router:Router) { }

feedbackSubmit(frm)
{

   this.feedbackObject ={
      feedName:frm.name,
      feedContact:frm.contact,
      feedEmail:frm.email,
      feedFb:frm.feedback
                        }
   this._http.post("quiz_api/insertFeedback.php",this.feedbackObject,{ responseType:'text'}).subscribe(
    () =>{

      Swal.fire({
          position: 'top-middle',
          type: 'success',
          title: 'Your Feedback Submitted Successfully...!!!',
          showConfirmButton: false,
          timer: 2000
           })

           this.router.navigate(['/']);
    });
    this.myform.reset();
} // funtion close......

  ngOnInit() {
  }

}
