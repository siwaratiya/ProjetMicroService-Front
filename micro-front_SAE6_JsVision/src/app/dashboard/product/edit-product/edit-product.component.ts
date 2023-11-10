import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../core/services/product/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProductModel} from "../../../core/models/product.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class EditProductComponent implements OnInit {

  @Input() modalEditProduct:boolean=true ;
  @Input() ProductId : any
  @Output() closeModalEditProduct=new EventEmitter<boolean>();
  @Output() refreshProduct=new EventEmitter<boolean>();


  public productForm!: FormGroup;

  public editProductForm!: FormGroup;

  product:ProductModel = new ProductModel();
  productToUpdate!:any;

  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

  constructor(
    private productService:ProductService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.productService.getProductById(this.ProductId).pipe(
      tap((res: any) => {
        this.product = res;
        this.productForm = this.formBuilder.group({
          'name_product': [this.product, Validators.required],
          'description': [this.product.description, Validators.required],
          'price': [this.product.price, Validators.required],
          'type_product': [this.product.type_product, Validators.required],
          'image': [this.product.image, Validators.required],
          'count_order': 0
        });
      })
    );

  this.initForm()
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      'name_product': [this.product, Validators.required],
      'description': [this.product.description, Validators.required],
      'price': [this.product.price, Validators.required],
      'type_product': [this.product.type_product, Validators.required],
      'image': [this.product.image, Validators.required],
      'count_order': 0
    });
  }


  cancel(){
    this.modalEditProduct = false;
    this.closeModalEditProduct.emit(this.modalEditProduct);
  }

  editProduct(){
    this.productToUpdate = this.productForm.value
    console.log(this.productToUpdate)
    this.productService.updateProduct(this.productToUpdate).subscribe(res => {
      console.log(this.product)
    })
  }

}
