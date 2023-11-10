import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";
import {ProductModel} from "../models/product.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SampleModel} from "../models/sample.model";



@Injectable({
  providedIn: 'root'
})
@Advised()
export class SampleApi extends ResourceService<SampleModel> {

  url = `${environment.apiUrl}`

  public sampleURL = '/Analyse-service/Sample/all';
  public sampleUR = '/Analyse-service/Sample/add';
  public sampleU = '/Analyse-service/Sample/delete';
  public sample = '/Analyse-service/Sample/update';
  public sampl = '/Analyse-service/Sample/get';

  constructor(
    private http:HttpClient
  ) {
    super(http , SampleModel)
  }
  public createProduct(product: SampleModel): Observable<string | undefined> {
    this.apiURL = this.sampleUR;
    return this.post(product).pipe(
      map((product : SampleModel) => product.idSample)
    );
  }



  public updateProduct(product: SampleModel): Observable<SampleModel> {
    this.apiURL = this.sample;
    return this.put(product);
  }
  public searchProductById(id: string){
    this.apiURL = this.sampl;
    return this.getById(id);
  }

  public removeProduct(id: any): Observable<any> {
    this.apiURL = this.sampleU ;
    return this.delete(id);
  }

  public findAll(): Observable<SampleModel[]> {
    this.apiURL = this.sampleURL;


    return this.get();
  }
}
