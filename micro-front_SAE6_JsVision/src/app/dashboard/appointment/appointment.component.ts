import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {AppointmentModel} from "../../core/models/appointment.model";
import {AppointmentService} from "../../core/services/appointment/appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class AppointmentComponent implements OnInit {

  appointments: AppointmentModel[] = [];
  currentDate = new Date();
  @Input() getAppointmentId : any
addNewAppointmentModal:boolean = false;
  editAppointmentModal:boolean = false;

  appointmentDialog: boolean = false;

  appointment!: AppointmentModel;

  type_product = [
    { label: 'Available', value: 'Available' },
    { label: 'Booked', value: 'Booked' },
  ];

  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private appointmentService:AppointmentService) { }

  ngOnInit() {
    this.appointmentService.findAllAppointments().subscribe(res =>{
      this.appointments = res
    })
  }
  openNew() {
    this.addNewAppointmentModal = true;
  }

  deleteAppointment(appointment: AppointmentModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + appointment.reason + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointmentService.removeAppointment(appointment.id).subscribe(res => {
          this.appointments.splice(appointment.id, 1); // Remove the item from the array
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 });
        })
      }
    });
  }

  hideDialog() {
    this.appointmentDialog = false;
    this.submitted = false;
  }

  getSeverity(status: string) : any {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Booked':
        return 'warning';
    }
  }

  EditAppointment(event: any){
    this.getAppointmentId = event
    this.editAppointmentModal = !this.editAppointmentModal;
  }


}
