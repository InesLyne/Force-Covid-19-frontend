import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-from-stock',
  templateUrl: './from-stock.component.html',
  styleUrls: ['./from-stock.component.css']
})
export class FromStockComponent implements OnInit , OnDestroy{
  form: FormGroup;
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  successMsg: any;

  users: any;
  welfares: any;
  
  constructor(private stockService: StockService, private global: GlobalService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetStock(this.id);
    } else {
      this.stock = new Stock();
    }

    this.users= [
        {label: 'Selectionnner un utilisateur', value: null},
        {label: 'Modou khoulé', value: '/api/users/25'},
        {label: 'Mbaye Traoré', value: '/api/users/26'},
        {label: 'Ameth Gaye', value: '/api/users/27'},
    ];

    this.welfares= [
        {label: 'Selectionnner un bien', value: null},
        {label: 'Riz', value: '/api/welfares/601'},
        {label: 'Gnambi', value: '/api/welfares/602'},
        {label: 'Diakhatou', value: '/api/welfares/603'},
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
