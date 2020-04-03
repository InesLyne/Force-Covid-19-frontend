import { ListAllocationComponent } from './../allocations/list-allocation/list-allocation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBeneficiaireComponent } from './list-beneficiaire/list-beneficiaire.component';
import { FormBeneficiaireComponent } from './form-beneficiaire/form-beneficiaire.component';
import { DetailsBeneficiaireComponent } from './details-beneficiaire/details-beneficiaire.component';
import { BeneficiaireRoutingModule } from './beneficiaire-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    ListBeneficiaireComponent,
    DetailsBeneficiaireComponent,
    FormBeneficiaireComponent,
    ListAllocationComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    BeneficiaireRoutingModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule
  ]
})
export class BeneficiairesModule { }
