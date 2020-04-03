import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { ShareModule } from 'src/app/share/share/share.module';
import { StatisticsRoutingModule } from './statistics-routing.module';



@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    ShareModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
