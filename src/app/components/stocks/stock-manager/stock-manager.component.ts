import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  listItems: Stock[];
  cols: any[];
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  successMsg: any;
  
  constructor(private stockService: StockService, private global: GlobalService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetStock(this.id);
      this.loadStockHistory(this.id);
    }

    this.cols = [
      { field: 'updated', header: 'Dernière Mise à jour', type: 'date' },
      { field: 'welfare.name', header: 'Nom Produit' },
      { field: 'quantity', header: 'Quantité' }
    ];
  }

  onGetStock(id: string){
    this.stockService.getStock(id).then(
      (restult: Stock)=>{
        this.stock=restult;
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

  onUpdateStock(){
    this.stock.updated= this.global.formatedCurentDate();
    this.stockService.updateStock(this.stock).then(
      (response: any)=>{
        this.successMsg= response;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onSubmit() {
    if (this.id) {
      this.onUpdateStock();
    }
  }

  onDialogHide() {
    this.stock = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}
