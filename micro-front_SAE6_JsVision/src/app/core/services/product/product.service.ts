import { Injectable } from '@angular/core';
import {ProductApi} from "../../api/product.api";
import {ProductModel} from "../../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private productApi:ProductApi
  ) {
  }
  createProduct(product:ProductModel){
    return this.productApi.createProduct(product);
  }

  updateProduct(product:ProductModel){
    return this.productApi.updateProduct(product);
  }

  getProductById(id:string){
    return this.productApi.searchProductById(id);
  }

  findAllProducts(params?:any){
    return this.productApi.findAll(params);
  }

  removeProduct(id : number){
    return this.productApi.removeProduct(id);
  }

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

}
