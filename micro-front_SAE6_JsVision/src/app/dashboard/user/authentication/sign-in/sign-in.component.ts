import { Component,OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { ReponseStatus } from 'src/app/core/models/user-model/ReponseStatus';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  stateMsgBoxAuth : boolean = false;
  constructor( public authService : AuthenticationService  ) { }
  ngOnInit(): void {}
  signIn(form: NgForm):void {  
     if(!form.invalid){
      this.authService.login(this.authService.authRequestDto).subscribe(
        (response) => { 
          this.authService.authResponseDto = response.body; 

          this.authService.msgReponseStatusDto = {title:this.authService.authResponseDto.title,
            datestamp:this.authService.authResponseDto.datestamp,timestamp:this.authService.authResponseDto.timestamp,
            status:this.authService.authResponseDto.status,message:this.authService.authResponseDto.message}; 

            if ( this.authService.msgReponseStatusDto.status === this.authService.SUCCESSFUL ) 
            {
              this.authService.saveLogin( this.authService.authResponseDto,this.authService.authRequestDto.username );
            //console.log(this.authService.authResponseDto);
            }
            else { this.stateMsgBoxAuth  = true ; }
        }
        ,(error) => {
          this.stateMsgBoxAuth  = true ; 
          this.authService.msgReponseStatusDto =  
          {title : "Error",datestamp: new Date() ,timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message} 
        }) ;
     }
    }
  closeEventstateMsgBoxAuth($event:any):void {  
    this.stateMsgBoxAuth = $event;
  }
  onClickForgotPassword() :void {this.authService.goToComponent('forgot-password'); }
  signUp():void {this.authService.goToComponent('sign-up'); }
}
