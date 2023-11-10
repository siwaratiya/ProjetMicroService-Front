import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  username:any = localStorage.getItem('usernameProfile');
  constructor() { }

  ngOnInit(): void {
    console.log(this.username)
  }

}
