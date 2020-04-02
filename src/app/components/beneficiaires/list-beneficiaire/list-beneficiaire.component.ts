import { GlobalService } from 'src/app/global.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { Beneficiaire } from 'src/app/models/beneficiaire';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import {SelectItem} from 'primeng/api';


interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-list-beneficiaire',
  templateUrl: './list-beneficiaire.component.html',
  styleUrls: ['./list-beneficiaire.component.css']
})
export class ListBeneficiaireComponent implements OnInit, OnDestroy {
  listItems: Beneficiaire[];
  cols: any[];
  selectedItems: Beneficiaire[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  beneficiairesSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;
  loading: boolean = true;

  displayDialog: any;
  selectedData: any;
  displayDetailsDialog: boolean;
  modalTitle: string;

  errorMsg: any;

  cities1: SelectItem[];
  cities2: SelectItem[];
  selectedCity1: City;
  selectedCity2: City;
  
  constructor(private beneficiaireService: BeneficiaireService, private global: GlobalService) {
    this.cities1 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];

    this.cities2 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Prénom' },
      { field: 'lastName', header: 'Nom' },
      { field: 'monthlyIncome', header: 'Salaire mensuel' },
      { field: 'numberOfChildren', header: "Nombre d'enfants" },
      { field: 'numberOfPeopleInCharge', header: 'Nombre de personnes en charge' },
      { field: 'mobileNumber', header: 'Contact' },
      { field: 'address', header: 'Adresse' }
    ];

    this.beneficiairesSubscription=this.beneficiaireService.beneficiairessSubject.subscribe(
      (beneficiaires: Beneficiaire[])=>{
        this.listItems=beneficiaires;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.beneficiaireService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.beneficiaireService.getBeneficiaires(searchCriteria);
      }
    );
    this.beneficiaireService.getBeneficiaires(this.searchCriteria);
  }

  ngOnDestroy(){
    if(this.beneficiairesSubscription){
      this.beneficiairesSubscription.unsubscribe();
    }
    if(this.searchCriteriaSubscription){
      this.searchCriteriaSubscription.unsubscribe();
    }
    if(this.totalRecordsSubscription){
      this.totalRecordsSubscription.unsubscribe();
    }
  }

  //Call this method in form filter template
  onSetSearchCriteria(){
    this.searchCriteriaSubject.next(this.searchCriteria);
  }

  loadItemLazy(event: any){
    this.searchCriteriaSubject.next(this.global.prepareSearchCriteria(event,this.searchCriteria));
  }

  removeItme(id: number){
    this.beneficiaireService.deleteBeneficiaire(id).then(
      (response: any)=>{
        //continued!!!
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  showFormDialog(oldData = null) {
    this.displayDetailsDialog = false;
    this.selectedData = oldData;
    this.displayDialog = true;
    this.modalTitle = 'Ajout d\'un bénéficiaire';
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.modalTitle = 'Recap Bénéficiaire';
  }

  onDialogHide(event) {
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    this.selectedData = null;
  }
}
