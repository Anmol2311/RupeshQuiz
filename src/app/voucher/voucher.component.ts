import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Voucher } from '../voucher';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  headers: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private _http: HttpClient) { }
   data:Voucher[] = [];
  // show:boolean = false;
  // examObj:object = {};
  term = "";
  p:any;
  // examStatus:string[];
  fetchVoucher(){
    this._http.get<Voucher[]>("../quiz_api/selectAllVouchers.php").subscribe(
          (res)=> {
            this.data = res;
          }
        );
      }

      deleteVoucher(id){
        if (confirm('Are you sure you want to delete this Voucher ?')) {
          this._http.post("../quiz_api/deleteVoucher.php",{'voucherID':id}, { responseType: 'text' }).subscribe(
            (res) => {
              if(res){
              this.fetchVoucher();
            }
          }
          );
        } 
      }


  ngOnInit() {
    this.fetchVoucher();
  }

 }
