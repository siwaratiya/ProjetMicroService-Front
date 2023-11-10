import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { Gender } from '../../models/user-model/Gender';
import { AccountDto } from '../../models/user-model/AcountDto';
import { Category } from '../../models/user-model/Category';
import { Service } from './globalservice';
import { StateRegion } from '../../models/user-model/StateRegion';
import { AttachementDto } from '../../models/user-model/AttachementDto';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends Service {

  public readonly FEMALE : Gender = Gender.female;
  public readonly MALE : Gender = Gender.male;
  public photoProfile:string = "assets/images/user/11.png"; 
  public coverProfile:string = "assets/images/page-img/profile-bg1.jpg"; 
  public accountDto : AccountDto = new AccountDto(); 
  public   category_photoprofile:Category = Category.PHOTOPROFILE;
  public   category_coverprofile:Category = Category.COVERPICTURE;
  public ListAccounts:AccountDto[]=[];
  constructor(http:HttpClient,router: Router,activeRoute: ActivatedRoute ,
      )
              { super(http,router,activeRoute); }


  getAll() : Observable<HttpResponse<any>>{return this.http.get(`${this.url}/user-service/account`,
  {observe : 'response', headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })  })}

  getById(id: any) : Observable<HttpResponse<any>>{
                return this.http.get(`${this.url}/user-service/account/${id}`,
                                      {observe : 'response', headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })  })
              }
  getByUsername(usename: string) : Observable<HttpResponse<any>>{
                return this.http.get(`${this.url}/user-service/account/select-by-username/${usename}`,
                 {observe : 'response' ,  headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })     } )
              }
  getByListUsernames(usenamesArray: string[]) : Observable<HttpResponse<any>>{
                return this.http.get(`${this.url}/user-service/account/select-by-usernames/${usenamesArray.join(',')}`,
                                     {observe : 'response'})
              }
  update(id:number ,  account:AccountDto) : Observable<HttpResponse<any>>{
                return this.http.put(`${this.url}/user-service/account/${id}`,account,
                       {observe : 'response',  headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })})
              }
  delete(id:any) : Observable<HttpResponse<any>>{
                return this.http.delete(`${this.url}/user-service/account/${id}`,
                                        {observe : 'response', headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })  }) }




     
              




 updatePhotoProfile( username:string , file:File ) : Observable<HttpResponse<any>> {
                const formData = new FormData();   // Create form data
                formData.append("file", file, file.name); // Store form name as "file" with file data
                return this.http.put(`${this.url}/user-service/attachment/photo-profile-to-account/${username}` ,formData, 
                {observe : 'response',  headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token })})
   }
 updatePhotoCover( username:string , file:File ) : Observable<HttpResponse<any>> {
                const formData = new FormData();   // Create form data
                formData.append("file", file, file.name); // Store form name as "file" with file data
                return this.http.put(`${this.url}/user-service/attachment/cover-profile-to-account/${username}` ,formData, 
                {observe : 'response' ,  headers: new HttpHeaders({ 'Authorization': "Bearer " +this.getAuthenticationRequest().token }) })
              }



 linkCV:string = "assets/images/page-img/profile-bg1.jpg"; 
 getLastFile(attachmentsDtoList : AttachementDto[] , category : Category ):string {
                const photoProfileAttachments = attachmentsDtoList.filter(attachment => attachment.category === category );
                if (photoProfileAttachments.length > 0) { 
                  const latestPhotoProfile = photoProfileAttachments.reduce(
                    (prevAttachment, currentAttachment) =>  prevAttachment.addAt > currentAttachment.addAt ? prevAttachment : currentAttachment);
                  return latestPhotoProfile.downloadURL;
                }
                return  ( category  === Category.PHOTOPROFILE ? "assets/images/user/11.png" : "assets/images/page-img/profile-bg1.jpg");
 }
              
   
              
public readonly  listStateRegion = [{ label: 'Ariana', value:  StateRegion.Ariana },  
                { label: 'Beja', value:  StateRegion.Beja },
                { label: 'Bizerte', value:  StateRegion.Bizerte }, 
                { label: 'Ben Arous', value:  StateRegion.Ben_Arous },
                { label: 'Gabes', value:  StateRegion.Gabes },
                { label: 'Gafsa', value:  StateRegion.Gafsa }, 
                { label: 'Jendouba', value:  StateRegion.Jendouba },
                { label: 'Kairouan', value:  StateRegion.Kairouan }, 
                { label: 'Kasserine', value:  StateRegion.Kasserine },
                { label: 'Manouba', value:  StateRegion.Manouba },  
                { label: 'Kef', value:  StateRegion.Kef },
                { label: 'Mahdia', value:  StateRegion.Mahdia }, 
                { label: 'Medenine', value:  StateRegion.Medenine },
                { label: 'Monastir', value:  StateRegion.Monastir }, 
                { label: 'Nabeul', value:  StateRegion.Nabeul },
                { label: 'Sfax', value:  StateRegion.Sfax }, 
                { label: 'Sidi_Bouzid', value:  StateRegion.Sidi_Bouzid },
                { label: 'Siliana', value:  StateRegion.Siliana }, 
                { label: 'Sousse', value:  StateRegion.Sousse },
                { label: 'Tataouine', value:  StateRegion.Tataouine },  
                { label: 'Tozeur', value:  StateRegion.Tozeur },
                { label: 'Tunis', value:  StateRegion.Tunis },
                { label: 'Zaghouan', value:  StateRegion.Zaghouan}];
           
}
