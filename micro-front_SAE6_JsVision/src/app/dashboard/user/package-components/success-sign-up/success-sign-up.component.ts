import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-success-sign-up',
  templateUrl: './success-sign-up.component.html',
  styleUrls: ['./success-sign-up.component.css']
})
export class SuccessSignUpComponent {
  public email : string = "abc@exemple.com";
  constructor( private route: ActivatedRoute ) {
    this.email = this.route.snapshot.params['email'];
  }
}
