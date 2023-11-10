import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../core/models/product.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {StockService} from "../../../core/services/stock/stock.service";
import {StockModel} from "../../../core/models/stock.model";

@Component({
  selector: 'app-details-stock',
  templateUrl: './details-stock.component.html',
  styleUrls: ['./details-stock.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class DetailsStockComponent implements OnInit {

  StockId!:any;

  products: Object[] = [];

  stock:StockModel = new StockModel();

  constructor(
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private router:ActivatedRoute,
    private stockService:StockService
  ) { }

  ngOnInit(): void {
    this.StockId = this.router.snapshot.params['id'];
    this.stockService.getStockById(this.StockId).subscribe((res:any) => {
      this.stock = res
    })
    this.stockService.getStockProducts(1).subscribe(response => {
      for (let i=0;i< response.products.length;i++){
        this.products.push(response.products[i]);
      }
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


}
