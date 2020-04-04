import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { Beneficiaire } from './../../../models/beneficiaire';
import { BienService } from 'src/app/services/bien.service';
import { Bien } from './../../../models/bien';
import { Stock } from './../../../models/stock';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Allocation } from 'src/app/models/allocation';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { LineAllocationModel } from 'src/app/models/line-allocation.model';

@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css']
})
export class ListAllocationComponent implements OnInit {
  //@Input() selectedItems: Allocation[];
  @Input() selectedRows: any;
  @Output() displayChange = new EventEmitter<boolean>();
  loading: boolean = true;
  errorMsg: any;
  successMsg: any;
  allocation: Allocation= new Allocation();
  lineAllocations: LineAllocationModel[]=[];
  biens: any;

  constructor(private beneficiaireService: BeneficiaireService, private global: GlobalService, private bienService: BienService) { }

  ngOnInit(): void {
    this.onGetBiensForDropdown();
  }



  onSubmit(){
    const beneficiaires= this.selectedRows as Beneficiaire[];
    for(let i=0; i<beneficiaires.length; i++){
      let beneficiaire=beneficiaires[i];
      let allocation: Allocation= new Allocation();
      allocation.lienAllocations=this.lineAllocations;
      allocation.created=this.global.formatedCurentDate();
      allocation.updated= this.global.formatedCurentDate();
      allocation.beneficiary=''+beneficiaire.id;
      if(beneficiaire.allocations && beneficiaire.allocations.length>0){
        beneficiaire.allocations.push(allocation);
      }else{
        beneficiaire.allocations=[];
        beneficiaire.allocations.push(allocation);
      }
      this.beneficiaireService.updateBeneficiaire(beneficiaire).then(
        (response: any)=>{
          if((beneficiaires.length-1)==i){
            this.onDialogHide();
          }
        }
      ).catch(
        (error: any)=>{
          this.errorMsg=error;
          if((beneficiaires.length-1)==i){
          }
        }
      )
    }
  }

  onGetBiensForDropdown(){
    this.bienService.getBiensForDropdown().then(
      (biens: any[])=>{
        this.biens=biens;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onPushLineAllocation(){
    let lineAllocation: LineAllocationModel= new LineAllocationModel();
    let welfare: Bien= new Bien();
    lineAllocation.welfare=welfare;
    this.lineAllocations.unshift(lineAllocation);
    console.log(this.lineAllocations);
    //this.lineAllocations.push(lineAllocation);
  }

  trackByFn = (index, item) => item.id;

  onRemoveLineAllocation(index: number){
    this.lineAllocations.splice(index,1);
  }

  onDialogHide() {
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.lineAllocations=[];
    this.displayChange.unsubscribe();
  }

}
