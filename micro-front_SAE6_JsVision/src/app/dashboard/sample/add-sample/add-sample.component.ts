import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../core/services/product/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {SampleService} from "../../../core/services/sample.service";

@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class AddSampleComponent implements OnInit {
  @Input() modalNewProduct : boolean= true
  @Output() closeModalNewProduct=new EventEmitter<boolean>();
  @Output() refreshProduct=new EventEmitter<boolean>();

  product:any;
  public productForm!: FormGroup;


  constructor(
    private sampleService:SampleService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      'date': ['', Validators.required],
      'numSample': ['', Validators.required],
      count_order:0
    })
  }

  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

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
    this.product.reference = this.sampleService.generateCode(8);
    this.sampleService.createProduct(this.product).subscribe(res => {
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
