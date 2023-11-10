import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";
import {StockModel} from "../models/stock.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
@Advised()
export class StockApi extends ResourceService<StockModel> {

  url = `${environment.apiUrl}`
  public stockURL = '/stock-service/stock/';

  constructor(
    private http:HttpClient
  ) {
    super(http , StockModel)
  }

  public createStock(stock: StockModel): Observable<string | undefined> {
    this.apiURL = this.stockURL;
    return this.post(stock).pipe(
      map((Stock : StockModel) => Stock.id)
    );
  }

  public updateStock(stock: StockModel): Observable<StockModel> {
    this.apiURL = this.stockURL;
    return this.put(stock);
  }

  public searchStockById(id: string){
    this.apiURL = this.stockURL;
    return this.getById(id);
  }

  public removeStock(id: string): Observable<any> {
    this.apiURL = this.stockURL ;
    return this.delete(id);
  }

  public findAll(criteria?: string): Observable<StockModel[]> {
    this.apiURL = this.stockURL;
    // const config = criteria !== undefined ? {params: {name_Stock: criteria}} : {};
    return this.get();
  }

  public getStockProducts(id: any): Observable<any>{
    return this.http.get(`${this.url}${this.stockURL}${id}`)
  }
}
