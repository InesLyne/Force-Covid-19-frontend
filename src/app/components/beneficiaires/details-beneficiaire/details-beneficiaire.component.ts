import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { Beneficiaire } from 'src/app/models/beneficiaire';
import { Subscription } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';



@Component({
  selector: 'app-details-beneficiaire',
  templateUrl: './details-beneficiaire.component.html',
  styleUrls: ['./details-beneficiaire.component.css']
})
export class DetailsBeneficiaireComponent implements OnInit {
  beneficiaire: Beneficiaire;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  allocations: any[];
  allocationsSubscription : Subscription;
  
  constructor(private beneficiaireService: BeneficiaireService, 
    private allocationService: AllocationService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetBeneficiaire(this.id);
      this.allocationsSubscription = this.allocationService.getAllocationsByBeneficiaryId(this.id).subscribe(
        (allocations: any) => {
          this.allocations=allocations['hydra:member'][0].lineAllocations;
        }, (error: any) => {
          console.log(error);
        },
        () => {
        }
      )
    }
  }

  onGetBeneficiaire(id: string){
    this.beneficiaireService.getBeneficiaire(id).then(
      (result: Beneficiaire)=>{
        this.beneficiaire=result;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onDialogHide() {
    this.beneficiaire = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
