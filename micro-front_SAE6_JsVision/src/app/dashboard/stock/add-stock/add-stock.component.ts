import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../core/services/product/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {StockService} from "../../../core/services/stock/stock.service";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AddStockComponent implements OnInit {

  @Input() modalNewStock : boolean= true
  @Output() closeModalNewStock=new EventEmitter<boolean>();
  @Output() refreshStock=new EventEmitter<boolean>();

  stock:any;
  public stockForm!: FormGroup;


  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

  state = [
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Arriving', value: 'ARRIVING' },
    { label: 'Out Of Stock', value: 'OUT_OF_STOCK' }
  ];


  constructor(
    private stockService:StockService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.stockForm = this.formBuilder.group({
      'unit': ['', Validators.required],
      'storage': ['', Validators.required],
      'LocalDate':['',Validators.required],
      'location':['',Validators.required],
      'type_product':['',Validators.required],
      'state':['',Validators.required],
      nbProduct:0,
      total_quantity:0
    })
  }




  addNewStock(){
    this.stock = this.stockForm.value;
    this.stockService.createStock(this.stock).subscribe(res => {
      this.cancel();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Product Added', life: 3000 });
    })
  }

  cancel(){
    this.modalNewStock = false;
    this.stockForm.reset();
    this.closeModalNewStock.emit(this.modalNewStock);
  }

}
