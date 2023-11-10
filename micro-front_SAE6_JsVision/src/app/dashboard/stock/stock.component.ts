import {Component, Input, OnInit} from '@angular/core';
import {StockModel} from "../../core/models/stock.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProductService} from "../../core/services/product/product.service";
import {StockService} from "../../core/services/stock/stock.service";
import {ProductModel} from "../../core/models/product.model";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class StockComponent implements OnInit {

  stockList: StockModel[] = [];

  @Input() getStockId : any
  addNewStockModal:boolean = false;
  editStockModal:boolean = false;
  stockDialog: boolean = false;
  submitted: boolean = false;
  stock!: StockModel;

  type_product = [
    { label: 'Equipment', value: 'EQUIPMENT' },
    { label: 'Reagent', value: 'REAGENT' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private stockService:StockService
  ) { }

  ngOnInit(): void {
    this.stockService.findAllStocks().subscribe(res => {
      this.stockList = res;
    })
  }

  openNew() {
    this.addNewStockModal = true;
  }

  hideDialog() {
    this.stockDialog = false;
    this.submitted = false;
  }

  getSeverity(status: string) : any {
    switch (status) {
      case 'EQUIPMENT':
        return 'success';
      case 'Reagent':
        return 'warning';
      case 'AVAILABLE':
        return 'success';
      case 'ARRIVING':
        return 'warning';
      case 'OUT_OF_STOCK':
        return 'error';
    }
  }

  EditStock(event: any){
    this.getStockId = event
    this.editStockModal = !this.editStockModal;
  }

  deleteStock(product: ProductModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name_product + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stockService.removeStock(product.id).subscribe(res => {
          this.stockList.splice(product.id, 1);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        })
      }
    });
  }

}
