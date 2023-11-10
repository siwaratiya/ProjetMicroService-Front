import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {ProductModel} from "../../core/models/product.model";
import {ProductService} from "../../core/services/product/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ProductComponent implements OnInit {

  products: ProductModel[] = [];

  @Input() getProductId : any
  addNewProductModal:boolean = false;
  editProductModal:boolean = false;

  productDialog: boolean = false;

  product!: ProductModel;


  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private productService:ProductService
  ) {}

  ngOnInit() {
    this.productService.findAllProducts().subscribe(res =>{
      this.products = res
    })
  }

  openNew() {
    this.addNewProductModal = true;
  }

  deleteProduct(product: ProductModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name_product + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.removeProduct(product.id).subscribe(res => {
          this.products.splice(product.id, 1);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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


}
