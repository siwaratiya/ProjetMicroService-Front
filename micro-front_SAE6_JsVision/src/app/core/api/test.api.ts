import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {TestModel} from "../models/test.model";



@Injectable({
  providedIn: 'root'
})
@Advised()
export class TestApi extends ResourceService<TestModel> {

  url = `${environment.apiUrl}`

  public sampleURL = '/Analyse-service/Test/all';
  public sampleUR = '/Analyse-service/Test/add';
  public sampleU = '/Analyse-service/Test/delete';
  public sample = '/Analyse-service/Test/update';
  public sampl = '/Analyse-service/Test/get';

  constructor(
    private http:HttpClient
  ) {
    super(http , TestModel)
  }
  public createProduct(product: TestModel): Observable<string | undefined> {
    this.apiURL = this.sampleUR;
    return this.post(product).pipe(
      map((product : TestModel) => product.idTest)
    );
  }



  public updateProduct(product: TestModel): Observable<TestModel> {
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

  public findAll(): Observable<TestModel[]> {
    this.apiURL = this.sampleURL;


    return this.get();
  }
}
