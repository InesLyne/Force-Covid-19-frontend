import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-details-stock',
  templateUrl: './details-stock.component.html',
  styleUrls: ['./details-stock.component.css']
})
export class DetailsStockComponent implements OnInit {
  listItems: Stock[] = [];
  cols: any[];
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetStock(this.id);
      this.loadStockHistory(this.id);
    }
    this.cols = [
      { field: 'updated', header: 'Dernière Mise à jour', type: 'date' },
      { field: 'welfare.name', header: 'Entré / sortie' },
      { field: 'quantity', header: 'Quantité' }
    ];
  }

  onGetStock(id: string){
    this.stockService.getStock(id).then(
      (restult: Stock)=>{
        this.stock=restult;
        this.listItems.push(this.stock);
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  loadStockHistory(id: string){
    this.stockService.getStockHistory(id).then(
      (restult: Stock[])=>{
        this.listItems=restult;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onDialogHide() {
    this.stock = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}
