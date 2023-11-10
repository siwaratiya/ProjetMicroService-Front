import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { SampleService } from 'src/app/core/services/sample.service';
import {ProductModel} from "../../core/models/product.model";
import {ProductService} from "../../core/services/product/product.service";
import {SampleModel} from "../../core/models/sample.model";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class SampleComponent implements OnInit {

  products: SampleModel[] = [];

  @Input() getProductId : any
  addNewProductModal:boolean = false;
  editProductModal:boolean = false;

  productDialog: boolean = false;

  product!: SampleModel;

  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private sampleService:SampleService) {}

  ngOnInit() {
    this.sampleService.findAllProducts().subscribe(res =>{
      this.products = res
    })
  }

  openNew() {
    this.addNewProductModal = true;
  }

  deleteProduct(idSample: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sampleService.removeProduct(idSample).subscribe(res => {
          this.products.splice(idSample, 1); // Remove the item from the array
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          this.refresh();

        })
      }

    });

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;

  }


  getSeverity(status: string) : any {
    switch (status) {
      case 'EQUIPMENT':
        return 'success';
      case 'Reagent':
        return 'warning';
    }
  }

  EditProduct(event: any){
    this.getProductId = event
    this.editProductModal = !this.editProductModal;
  }
  refresh(): void {
    window.location.reload();
  }
}
