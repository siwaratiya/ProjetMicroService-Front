import {Component, Input, OnInit} from '@angular/core';
import {SampleModel} from "../../core/models/sample.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {SampleService} from "../../core/services/sample.service";
import {TestModel} from "../../core/models/test.model";
import {TestService} from "../../core/services/test/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class TestComponent implements OnInit {

  products: TestModel[] = [];

  @Input() getProductId : any
  addNewProductModal:boolean = false;
  editProductModal:boolean = false;

  productDialog: boolean = false;

  product!: TestModel;



  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private testService:TestService) {}

  ngOnInit() {
    this.testService.findAllProducts().subscribe(res =>{
      this.products = res
    })
  }

  openNew() {
    this.addNewProductModal = true;
  }

  deleteProduct(idTest: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.testService.removeProduct(idTest).subscribe(res => {
          this.products.splice(idTest, 1); // Remove the item from the array
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
