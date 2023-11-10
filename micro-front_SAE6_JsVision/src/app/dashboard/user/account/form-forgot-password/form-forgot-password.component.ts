import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReponseStatus } from 'src/app/core/models/user-model/ReponseStatus';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

@Component({
  selector: 'app-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.css']
})
export class FormForgotPasswordComponent implements OnInit {

  stateMsgBoxAuth : boolean = false;
  constructor( public authService : AuthenticationService  ) { }
  ngOnInit(): void {}
  onClickForgotPassword(form: NgForm):void { 
    if (!form.invalid) { 
    this.authService.sendMailCodeForgotPassword(this.authService.authRequestDto.username, this.authService.authRequestDto.email ).subscribe(
      (response) => {
        this.stateMsgBoxAuth = true ; 
        this.authService.msgReponseStatusDto = response.body;
       }
    ,(error) => { 
      this.stateMsgBoxAuth = true ; 
      this.authService.msgReponseStatusDto =  
      { title : "Error", datestamp: new Date() , timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message};
    });
   }
  }
  closeEventstateMsgBoxAuth($event:any):void {  
    this.stateMsgBoxAuth = $event;
  } 
  signIn():void {this.authService.goToComponent('sign-in'); }
}