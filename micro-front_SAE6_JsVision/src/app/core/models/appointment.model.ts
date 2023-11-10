import {ResourceModel} from "../common/resource.model";
import {AppointmentStatus} from "./constant/appointment_statuts.model";

export class AppointmentModel extends ResourceModel<AppointmentModel>{

  id?: any;
  reason?: string;
  createdAt?: any;
  comments?: string;
  appointmentStart?: any;
  appointmentEnd?: any;
  appointmentStatus?:AppointmentStatus;
  firstVisit?: string;

  constructor(model?: Partial<AppointmentModel>) {
    super(model);
  }
}
