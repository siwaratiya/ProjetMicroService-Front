import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SampleService} from "../../../core/services/sample.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {TestService} from "../../../core/services/test/test.service";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AddTestComponent implements OnInit {

  @Input() modalNewProduct : boolean= true
  @Output() closeModalNewProduct=new EventEmitter<boolean>();
  @Output() refreshProduct=new EventEmitter<boolean>();

  product:any;
  public productForm!: FormGroup;


  constructor(
    private testService:TestService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      'nameTest': ['', Validators.required],
      'price': ['', Validators.required],
      count_order:0
    })
  }



  getSeverity(status: string) : any {
    switch (status) {
      case 'EQUIPMENT':
        return 'success';
      case 'Reagent':
        return 'warning';
    }
  }

  addNewProduct(){
    this.product = this.productForm.value;
    this.product.reference = this.testService.generateCode(8);
    this.testService.createProduct(this.product).subscribe(res => {
      this.cancel();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
      this.refresh();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Product Added', life: 3000 });
    })
  }

  cancel(){
    this.modalNewProduct = false;
    this.productForm.reset();
    this.closeModalNewProduct.emit(this.modalNewProduct);
  }

  refresh(): void {
    window.location.reload();
  }
}
