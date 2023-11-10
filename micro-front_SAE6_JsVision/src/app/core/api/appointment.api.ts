import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AppointmentModel} from "../models/appointment.model";
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
@Advised()
export class AppointmentApi extends ResourceService<AppointmentModel> {

  url = `${environment.apiUrl}`
  public addappointmentURL = '/appointment-service/appointment/add/';
  public getAllappointmentURL = '/appointment-service/appointment/getAll';
  public updateappointmentURL = '/appointment-service/appointment/update/id';
  public deleteappointmentURL = '/appointment-service/appointment/delete/';
  public getIdappointmentURL = '/appointment-service/appointment/get/{id}';
  constructor(
    private http:HttpClient
  ) {
    super(http , AppointmentModel)
  }

  public createAppointment(appointment: AppointmentModel): Observable<string | undefined> {
    this.apiURL = this.addappointmentURL;
    return this.post(appointment).pipe(
      map((appointment : AppointmentModel) => appointment.id)
    );
  }

  public updateAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    this.apiURL = this.updateappointmentURL;
    return this.put(appointment);
  }

  public searchAppointmentById(id: string){
    this.apiURL = this.getIdappointmentURL;
    return this.getById(id);
  }

  public removeAppointment(id: any): Observable<any> {
    this.apiURL = this.deleteappointmentURL ;
    return this.delete(id);
  }

  public findAll(criteria?: string): Observable<AppointmentModel[]> {
    this.apiURL = this.getAllappointmentURL;
    const config = criteria !== undefined ? {params: {reason: criteria}} : {};

    return this.get(config);
  }
}
