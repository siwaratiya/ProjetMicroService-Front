import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../core/services/product/product.service";
import {AppointmentService} from "../../../core/services/appointment/appointment.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AddAppointmentComponent implements OnInit {

  @Input() modalNewAppointment : boolean= true
  @Output() closeModalNewAppointment=new EventEmitter<boolean>();
  @Output() refreshAppointment=new EventEmitter<boolean>();

  appointment: any;
  public appointmentForm!: FormGroup;
  changed!: Date;

  constructor(
    private appointmentService:AppointmentService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.appointmentForm = this.formBuilder.group({
      'reason': ['', Validators.required],
      'createdAt': ['', Validators.required],
      'comments': ['', Validators.required],
      'appointmentStart': ['', Validators.required],
      'appointmentStatus': ['', Validators.required],
      'firstVisit':['',Validators.required],
      count_order:0
    })
  }

  appointmentStatus = [
    { label: 'Available', value: 'Available' },
    { label: 'Booked', value: 'Booked' },
  ];

  getSeverity(status: string) : any {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Booked':
        return 'warning';
    }
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

  addNewAppointment(){
    this.appointment = this.appointmentForm.value;
    this.appointmentService.createAppointment(this.appointment).subscribe(res => {
      this.cancel();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Added', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Appointment Failed', life: 3000 });
    })
  }

  cancel(){
    this.modalNewAppointment = false;
    this.appointmentForm.reset();
    this.closeModalNewAppointment.emit(this.modalNewAppointment);
  }

}
