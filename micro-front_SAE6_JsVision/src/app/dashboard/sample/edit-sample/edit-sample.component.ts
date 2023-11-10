import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {tap} from "rxjs";
import {SampleService} from "../../../core/services/sample.service";
import {SampleModel} from "../../../core/models/sample.model";


@Component({
  selector: 'app-edit-sample',
  templateUrl: './edit-sample.component.html',
  styleUrls: ['./edit-sample.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class EditSampleComponent implements OnInit {

  @Input() modalEditProduct:boolean=true ;
  @Input() ProductId : any
  @Output() closeModalEditProduct=new EventEmitter<boolean>();
  @Output() refreshProduct=new EventEmitter<boolean>();


  public productForm!: FormGroup;

  public editProductForm!: FormGroup;

  product:SampleModel = new SampleModel();
  productToUpdate!:any;

  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

  constructor(
    private sampleService:SampleService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.sampleService.getProductById(this.ProductId).pipe(
      tap((res: any) => {
        this.product = res;
      })
    );
    console.log(this.product.numSample)
    this.initForm()
  }

  initForm(){
    this.productForm = this.formBuilder.group({

      'date': [this.product.date, Validators.required],
      'numSample': [this.product.numSample, Validators.required],
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
    this.sampleService.updateProduct(this.productToUpdate).subscribe(res => {
      console.log(this.product)
    })
  }


}
