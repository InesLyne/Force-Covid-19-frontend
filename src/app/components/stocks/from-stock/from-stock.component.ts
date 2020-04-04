import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-from-stock',
  templateUrl: './from-stock.component.html',
  styleUrls: ['./from-stock.component.css']
})
export class FromStockComponent implements OnInit {
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  successMsg: any;

  welfaresCategory: any;
  welfaresWeightUnit: any;
  
  constructor(private stockService: StockService, private global: GlobalService) { }

  ngOnInit(): void {
    console.log(this.id)
    if(this.id){
      this.onGetStock(this.id);
    } else {
      this.stock = new Stock();
    }
    
    this.welfaresCategory=[
        {label: 'Choix categroir', value: ''},
        {label: 'Périssable', value: 'Périssable'},
        {label: 'Non périssable', value: 'Non périssable'},
        {label: 'Espèces', value: 'Espèces'},
    ];

    this.welfaresWeightUnit=[
      {label: 'Choix unité', value: ''},
      {label: 'tonne', value: 'tonne'},
      {label: 'kg', value: 'kg'},
      {label: 'g', value: 'g'},
      {label: 'l', value: 'l'},
      {label: 'ml', value: 'ml'},
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


  onAddStock(){
    this.stock.created= this.global.formatedCurentDate();
    this.stock.updated= this.global.formatedCurentDate();
    this.stockService.addStock(this.stock).then(
      (response: any)=>{
        this.successMsg= response;
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
    console.log(this.stock)
    if (this.id) {
      this.onUpdateStock();
    } else {
      this.onAddStock();
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
