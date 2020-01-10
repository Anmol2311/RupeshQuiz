import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uname:string;
  user:string;
  constructor(private dataService:DataService) { }

  logout(){
    this.dataService.isLogout();
  }
  ngOnInit() {
    this.uname = sessionStorage.getItem('uname');
    this.user = sessionStorage.getItem('user');
  }

}
