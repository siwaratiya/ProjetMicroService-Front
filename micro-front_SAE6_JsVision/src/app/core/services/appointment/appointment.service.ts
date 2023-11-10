import { Injectable } from '@angular/core';
import {AppointmentApi} from "../../api/appointment.api";
import {AppointmentModel} from "../../models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private appointmentApi:AppointmentApi
  ) {}

  createAppointment(appointment:AppointmentModel){
    return this.appointmentApi.createAppointment(appointment);
  }

  updateAppointment(appointment:AppointmentModel){
    return this.appointmentApi.updateAppointment(appointment);
  }

  getAppointmentById(id:string){
    return this.appointmentApi.searchAppointmentById(id);
  }

  findAllAppointments(params?:any){
    return this.appointmentApi.findAll(params);
  }

  removeAppointment(id : number){
    return this.appointmentApi.removeAppointment(id);
  }


}



