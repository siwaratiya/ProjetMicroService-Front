import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";
import {ProductModel} from "../models/product.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
@Advised()
export class ProductApi extends ResourceService<ProductModel> {

  url = `${environment.apiUrl}`
  public productURL = '/stock-service/product/';

  constructor(
    private http:HttpClient
  ) {
    super(http , ProductModel)
  }

  public createProduct(product: ProductModel): Observable<string | undefined> {
    this.apiURL = this.productURL;
    return this.post(product).pipe(
      map((product : ProductModel) => product.id)
    );
  }

  public updateProduct(product: ProductModel): Observable<ProductModel> {
    this.apiURL = this.productURL;
    return this.put(product);
  }

  public searchProductById(id: string){
    this.apiURL = this.productURL;
    return this.getById(id);
  }

  public removeProduct(id: any): Observable<any> {
    this.apiURL = this.productURL ;
    return this.delete(id);
  }

  public findAll(criteria?: string): Observable<ProductModel[]> {
    this.apiURL = this.productURL;
    const config = criteria !== undefined ? {params: {name_product: criteria}} : {};

    return this.get(config);
  }

}
