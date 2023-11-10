import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from "../../../core/models/product.model";
import {ProductService} from "../../../core/services/product/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AddProductComponent implements OnInit {

  @Input() modalNewProduct : boolean= true
  @Output() closeModalNewProduct=new EventEmitter<boolean>();
  @Output() refreshProduct=new EventEmitter<boolean>();

  product:any;
  public productForm!: FormGroup;


  constructor(
    private productService:ProductService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      'name_product': ['', Validators.required],
      'description': ['', Validators.required],
      'price': ['', Validators.required],
      'type_product': ['', Validators.required],
      'image': ['', Validators.required],
      'quantity':['',Validators.required],
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
    this.product.reference = this.productService.generateCode(8);
    this.productService.createProduct(this.product).subscribe(res => {
      this.cancel();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Product Failed', life: 3000 });
    })
  }

  cancel(){
    this.modalNewProduct = false;
    this.productForm.reset();
    this.closeModalNewProduct.emit(this.modalNewProduct);
  }
}
