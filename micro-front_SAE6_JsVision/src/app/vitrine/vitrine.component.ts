import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit {

  userConnected : any = localStorage.getItem('AccountDto');

  constructor(
    private route:Router
  ) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.userConnected));
  }

  connectedUser(){
    if (this.userConnected== null){
      this.route.navigateByUrl('/sign-in');
    }else {
      this.route.navigateByUrl('/admin/product')
    }
  }

}
