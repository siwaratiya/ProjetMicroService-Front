import { Injectable } from '@angular/core';
import {StockApi} from "../../api/stock.api";
import {StockModel} from "../../models/stock.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private stockApi:StockApi
  ) {
  }
  createStock(stock:StockModel){
    return this.stockApi.createStock(stock);
  }

  updateStock(stock:StockModel){
    return this.stockApi.updateStock(stock);
  }

  getStockById(id:string){
    return this.stockApi.searchStockById(id);
  }

  findAllStocks(params?:any){
    return this.stockApi.findAll(params);
  }

  removeStock(id : string){
    return this.stockApi.removeStock(id);
  }

  getStockProducts(id:any){
    return this.stockApi.getStockProducts(id);
  }
}
