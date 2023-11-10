import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SampleApi } from '../api/sample.api';
import {ProductModel} from "../models/product.model";
import {SampleModel} from "../models/sample.model";

@Injectable({
  providedIn: 'root'
})
export class SampleService {

 url = `${environment.apiUrl}`
  constructor(
    //private http:HttpClient
  private sampleApi:SampleApi
 ) { }
  findAllProducts(){
    return this.sampleApi.findAll();
  }
  createProduct(product:SampleModel){
    return this.sampleApi.createProduct(product);
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
    return this.sampleApi.removeProduct(id);
  }
  updateProduct(product:SampleModel){
    return this.sampleApi.updateProduct(product);
  }
  getProductById(id:string){
    return this.sampleApi.searchProductById(id);
  }
}

