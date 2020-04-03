import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAllocationComponent } from './list-allocation/list-allocation.component';
import { DetailsAllocationComponent } from './details-allocation/details-allocation.component';
import { FormAllocationComponent } from './form-allocation/form-allocation.component';
import { AllicationsRoutingModule } from './allocations-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [
    /* ListAllocationComponent, */
    DetailsAllocationComponent,
    FormAllocationComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AllicationsRoutingModule
  ]
})
export class AllocationsModule { }
