import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'; 
import { Service } from './globalservice';
import { AuthenticationRequestDto } from '../../models/user-model/AuthenticationRequestDto';
import { AuthenticationResponseDto } from '../../models/user-model/AuthenticationResponseDto';
import { ReponseStatus } from '../../models/user-model/ReponseStatus';
import { AccountService } from './account.service';
import { Roles } from '../../models/user-model/Roles';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends Service  {
  authRequestDto : AuthenticationRequestDto = new AuthenticationRequestDto();
  authResponseDto : AuthenticationResponseDto = new AuthenticationResponseDto();
  public readonly  SUCCESSFUL :ReponseStatus = ReponseStatus.SUCCESSFUL;
  public readonly  ERROR:ReponseStatus = ReponseStatus.ERROR;
  public readonly  UNSUCCESSFUL:ReponseStatus = ReponseStatus.UNSUCCESSFUL;


  
  constructor( http:HttpClient,
               router: Router,
               activeRoute: ActivatedRoute,
               private accountService : AccountService  ) 
               { super(http,router,activeRoute); }





register(authRequestDto:AuthenticationRequestDto) : Observable<HttpResponse<any>> {
                return this.http.post(`${this.url}/user-service/account/register`,
                authRequestDto ,
                {observe : 'response',  headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
              }


login(authRequest:AuthenticationRequestDto) : Observable<HttpResponse<any>> {
                return this.http.post(`${this.url}/user-service/keycloak/login`,authRequest , {observe : 'response'
                ,  headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
              }
saveLogin(authResponseDto : AuthenticationResponseDto,username:string):void{
                this.setToken(authResponseDto);
                this.accountService.getByUsername (username).subscribe(
                  (response) => { 
                    this.accountService.accountDto =  response.body; 
                    this.accountService.setAccountDto( this.accountService.accountDto);
                    console.log( this.accountService.accountDto);
                    this.goToComponent('user/profile/'+this.accountService.accountDto.username); 
                   }
                ,(error) => {   console.log("AuthenticationService saveLogin " +  error.message )  }) ; 
              }

logout() : Observable<HttpResponse<any>> { 
                return this.http.post(`${this.url}/user-service/keycloak/logout` ,{}, {observe : 'response'
                ,  headers: new HttpHeaders({ 'Authorization': "Bearer " +this. getAuthenticationRequest().token ,
                'refresh-token': this. getAuthenticationRequest().refresh_token})     }  )
              }

 sendMailCodeForgotPassword( username:string, email:string ):Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/account/mail-code-forgot-password/${username}/${email}` ,{}, 
      {observe : 'response'})
    }
 updateForgotPassword( username:string, code:string, newpassword:string ):Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/account/update-forgot-password/${username}/${code}/${newpassword}` ,{}, 
      {observe : 'response'})
    }
 updatePassword( username:string, currentPassword:string,newPassword:string ) : Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/account/update-password/${username}/${currentPassword}/${newPassword}` ,{}, 
      {observe : 'response',  headers: new HttpHeaders({ 'Authorization': "Bearer " +this. getAuthenticationRequest().token }) })
    }





    isAuthenticated(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
       console.log('state.url: ', state.url);
       const pathFromRoot = route.pathFromRoot .map(route => route.url.join('/')) .join('/');
       console.log('Full path: ', pathFromRoot); 
       console.log( this.isPathValid(pathFromRoot,this.listPathPermision) );  

       return true; 
     }
     private isPathValid(pathToCheck: string,listPathPermission:any): boolean {
      // Loop through the list of path permissions
      for (const pathPermission of listPathPermission) {
        // Convert the path to a regular expression pattern
        const pathPattern = pathPermission.path.replace(/\*\*/g, '.*');
        
        // Create a regular expression from the pattern
        const regex = new RegExp(`^${pathPattern}$`);
    
        // Check if the provided path matches the pattern
        //if (regex.test(pathToCheck)) {return true;}

        if (regex.test(pathToCheck)&&this.getAccoutDto().role == pathPermission.role ) {//if (regex.test(pathToCheck)) {
          return true;
        }
      }
    
      return false;
    }
     private readonly  listPathPermision = [
      { role: Roles.Patient, path:  '/user/profile/**' },
      { role: Roles.Doctor, path:  '/user/profile/**' },
      { role: Roles.Receptionist, path:  '/user/profile/**' },
      { role: Roles.Biologist, path:  '/user/profile/**' },
      { role: Roles.Chief_Service, path:  '/user/profile/**' },
      { role: Roles.Intern, path:  '/user/profile/**' },

      { role: Roles.Patient, path:  '/user/account/update-profile' },
      { role: Roles.Doctor, path:  '/user/account/update-profile' },
      { role: Roles.Receptionist, path:  '/user/account/update-profile' },
      { role: Roles.Biologist, path:  '/user/account/update-profile' },
      { role: Roles.Chief_Service, path:  '/user/account/update-profile' },
      { role: Roles.Intern, path:  '/user/account/update-profile' }];


 /*clearAll() :void{this.clearAuthenticationRequest();this.accountService.clearAccoutDto(); } 
 setToken(authResponseDto : AuthenticationResponseDto) :void
 {this.clearAuthenticationRequest();localStorage.setItem('AuthenticationResponse',JSON.stringify(authResponseDto));}  
 getAuthenticationRequest() : AuthenticationResponseDto{
   const authenticationResponseString =   localStorage.getItem('AuthenticationResponse'); 
   const authResponseDto = (  authenticationResponseString == null ?  new AuthenticationResponseDto :  JSON.parse(authenticationResponseString)  ) ;
   return authResponseDto;} 
 clearAuthenticationRequest() : void{localStorage.removeItem( 'AuthenticationResponse');}*/

 
}
