import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStockComponent } from './list-stock/list-stock.component';
import { DetailsStockComponent } from './details-stock/details-stock.component';
import { FromStockComponent } from './from-stock/from-stock.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { StockManagerComponent } from './stock-manager/stock-manager.component';



@NgModule({
  declarations: [
    ListStockComponent,
    DetailsStockComponent,
    FromStockComponent,
    StockManagerComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    StocksRoutingModule
  ]
})
export class StocksModule { }
