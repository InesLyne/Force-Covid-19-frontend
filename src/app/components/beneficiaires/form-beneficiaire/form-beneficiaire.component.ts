import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { Beneficiaire } from 'src/app/models/beneficiaire';



@Component({
  selector: 'app-form-beneficiaire',
  templateUrl: './form-beneficiaire.component.html',
  styleUrls: ['./form-beneficiaire.component.css']
})
export class FormBeneficiaireComponent implements OnInit {
  beneficiaire: Beneficiaire;
  @Input() id: any;
  @Output() displayChange = new EventEmitter<boolean>();
  errorMsg: any;
  successMsg: any;

  allocations: any;
  selectedAllocations: any;
  subdivisions: any;
  
  constructor(private beneficiaireService: BeneficiaireService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetBenefiaire(this.id);
    } else {
      this.beneficiaire = new Beneficiaire();
    }

    this.allocations = [
      {label: 'Allocation 1', value: '/api/allocations/1'},
      {label: 'Allocation 2', value: '/api/allocations/2'},
      {label: 'Allocation 3', value: '/api/allocations/3'},
      {label: 'Allocation 4', value: '/api/allocations/4'},
      {label: 'Allocation 5', value: '/api/allocations/5'},
      {label: 'Allocation 6', value: '/api/allocations/6'},
      {label: 'Allocation 7', value: '/api/allocations/7'},
      {label: 'Allocation 8', value: '/api/allocations/8'},
      {label: 'Allocation 9', value: '/api/allocations/9'},
      {label: 'Allocation 10', value: '/api/allocations/10'},
  ];

  this.subdivisions = [
    {label: 'Selectionnner subdivision', value: null},
    {label: 'Subdivision 1', value: '/api/subdivisions/450'},
    {label: 'Subdivision 2', value: '/api/subdivisions/483'},
    {label: 'Subdivision 3', value: '/api/subdivisions/496'},
    {label: 'Subdivision 4', value: '/api/subdivisions/423'},
    {label: 'Subdivision 5', value: '/api/subdivisions/480'}
];
  }

  onGetBenefiaire(id: string){
    this.beneficiaireService.getBeneficiaire(id).then(
      (beneficiaire: Beneficiaire)=>{
        this.beneficiaire=beneficiaire;
        if(this.beneficiaire && this.beneficiaire.allocations && this.allocations.length>0){
          this.selectedAllocations=this.beneficiaire.allocations.join(',');
        }
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onAddBeneficiaire(){
    if(this.selectedAllocations){
      this.beneficiaire.allocations=this.selectedAllocations.split(',');
    }
    this.beneficiaireService.addBeneficiaire(this.beneficiaire).then(
      (response: any)=>{
        this.successMsg= response;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onUpdateBeneficiaire(){
    if(this.selectedAllocations){
      this.beneficiaire.allocations=this.selectedAllocations.split(',');
    }
    this.beneficiaireService.updateBeneficiaire(this.beneficiaire).then(
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
      this.onUpdateBeneficiaire();
    } else {
      this.onAddBeneficiaire();
    }
  }

  onDialogHide() {
    this.beneficiaire = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}
