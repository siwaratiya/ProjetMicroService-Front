import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TestApi} from "../../api/test.api";
import {TestModel} from "../../models/test.model";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  url = `${environment.apiUrl}`
  constructor(
    //private http:HttpClient
    private testApi:TestApi
  ) { }
  findAllProducts(){
    return this.testApi.findAll();
  }
  createProduct(product:TestModel){
    return this.testApi.createProduct(product);
  }
  /*getAll() : Observable<HttpResponse<any>>{
    return this.http.get(`${this.url}Analyse-service/Sample/all` , {observe : 'response'})
  }*/
  generateCode(length: number): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  removeProduct(id : number){
    return this.testApi.removeProduct(id);
  }
  updateProduct(product:TestModel){
    return this.testApi.updateProduct(product);
  }
  getProductById(id:string){
    return this.testApi.searchProductById(id);
  }
}
