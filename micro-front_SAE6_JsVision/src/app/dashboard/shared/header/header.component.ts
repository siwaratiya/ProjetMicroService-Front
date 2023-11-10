import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/user-model/Category';
import { AccountService } from 'src/app/core/services/user/account.service';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string = ''; 
  constructor( public authService : AuthenticationService,public accountService : AccountService  ) { }

  ngOnInit(): void {
    this.accountService.accountDto = this.accountService.getAccoutDto();
    this.accountService.photoProfile = this.accountService.getLastFile(this.accountService.accountDto.attachementsDto,Category.PHOTOPROFILE);
    this.username =  this.accountService.getAccoutDto().username;
  }
  onClickSignOut() :void {
    this.authService.logout().subscribe(
      (response) => {   
        this.authService.clearAll();
        this.authService.goToComponent('sign-in');}
      ,(error) => {console.log(error);}) ;
  }
  onChange($event:any):void{
    console.log($event.target.value );
   }
}
