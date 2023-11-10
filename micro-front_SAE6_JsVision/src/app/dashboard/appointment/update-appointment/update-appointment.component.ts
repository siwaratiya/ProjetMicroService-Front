import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductModel} from "../../../core/models/product.model";
import {AppointmentModel} from "../../../core/models/appointment.model";
import {ProductService} from "../../../core/services/product/product.service";
import {AppointmentService} from "../../../core/services/appointment/appointment.service";
import {tap} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class UpdateAppointmentComponent implements OnInit {

  @Input() modalUpdateAppointment:boolean=true ;
  @Input() AppointmentId : any
  @Output() closeModalUpdateAppointment=new EventEmitter<boolean>();
  @Output() refreshAppointment=new EventEmitter<boolean>();

  public appointmentForm!: FormGroup;

  public updateappointmentForm!: FormGroup;
  changed!: Date;

  appointment:AppointmentModel = new AppointmentModel();
  appointmentToUpdate!:any;

  appointmentStatus = [
    { label: 'Available', value: 'Available' },
    { label: 'Booked', value: 'Booked' },
  ];

  constructor(
    private appointmentService:AppointmentService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentById(this.AppointmentId).pipe(
      tap((res: any) => {
        this.appointment = res;
      })
    );
    console.log(this.appointment.reason)
    this.initForm()
  }

  initForm(){
    this.appointmentForm = this.formBuilder.group({
      'reason': [this.appointment, Validators.required],
      'createdAt': [this.appointment.createdAt, Validators.required],
      'comments': [this.appointment.comments, Validators.required],
      'appointmentStart': [this.appointment.appointmentStart, Validators.required],
      'appointmentStatus': [this.appointment.appointmentStatus, Validators.required],
      'firstVisit': [this.appointment.firstVisit, Validators.required],
      'count_order': 0
    });
  }

  cancel(){
    this.modalUpdateAppointment = false;
    this.closeModalUpdateAppointment.emit(this.modalUpdateAppointment);
  }

  updateAppointment(){
    this.appointmentToUpdate = this.appointmentForm.value
    console.log(this.appointmentToUpdate)
    this.appointmentService.updateAppointment(this.appointmentToUpdate).subscribe(res => {
      console.log(this.appointment)
    })
  }

  pipe = new DatePipe('en-US');
  newDate!: string | null;
  changeFormat(changed: Date){
    let ChangedFormat = this.pipe.transform(this.changed, 'dd-MM-YYYY');
    this.newDate = ChangedFormat;
  }

  onClick() {
    this.changeFormat(this.changed);
    console.log(this.changed);
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

}
