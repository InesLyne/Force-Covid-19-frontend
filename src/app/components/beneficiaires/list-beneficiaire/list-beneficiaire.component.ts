import { GlobalService } from 'src/app/global.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { Beneficiaire } from 'src/app/models/beneficiaire';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { SelectItem } from 'primeng/api';


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
  searchCriteria: SearchCriteria = new SearchCriteria();
  totalRecords: number = 0;
  searchCriteriaSubject = new Subject<SearchCriteria>();
  beneficiairesSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;
  loading: boolean = true;

  displayDialog: any;
  selectedData: any;
  displayDetailsDialog: boolean;
  displayAllocationDialog: boolean;
  modalTitle: string;

  errorMsg: any;

  selectedCity1: City;
  selectedCity2: City;
  BeneficiaresFullName: string[] = [];
  filteredNames: string[];
  selectName: string;
  salaire: number;

  constructor(private beneficiaireService: BeneficiaireService, private global: GlobalService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Nom Bénéficiaire' },
      { field: 'monthlyIncome', header: 'Salaire mensuel' },
      { field: 'numberOfChildren', header: "Nombre d'enfants" },
      { field: 'numberOfPeopleInCharge', header: 'Nombre de personnes en charge' },
      { field: 'mobileNumber', header: 'Contact' },
      { field: 'address', header: 'Adresse' },
      { field: 'address', header: 'Coordonnées GPS' }
    ];

    this.beneficiairesSubscription = this.beneficiaireService.beneficiairessSubject.subscribe(
      (beneficiaires: Beneficiaire[]) => {
        this.BeneficiaresFullName =[];
        this.listItems = beneficiaires;
        this.loading = false;
        for (let beneficiaire of beneficiaires) {
          this.BeneficiaresFullName.push(`${beneficiaire.firstName} ${beneficiaire.lastName}`);
        }
      }
    );
    this.totalRecordsSubscription = this.beneficiaireService.totalRecordsSubject.subscribe(
      (totalRecords: number) => {
        this.totalRecords = totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription = this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria) => {
        console.log(this.searchCriteria)
        this.beneficiaireService.getBeneficiaires(searchCriteria);
      }
    );
    this.beneficiaireService.getBeneficiaires(this.searchCriteria);
  }

  ngOnDestroy() {
    if (this.beneficiairesSubscription) {
      this.beneficiairesSubscription.unsubscribe();
    }
    if (this.searchCriteriaSubscription) {
      this.searchCriteriaSubscription.unsubscribe();
    }
    if (this.totalRecordsSubscription) {
      this.totalRecordsSubscription.unsubscribe();
    }
  }

  //Call this method in form filter template
  onSetSearchCriteria() {
    this.searchCriteriaSubject.next(this.searchCriteria);
  }

  loadItemLazy(event: any) {
    this.searchCriteriaSubject.next(this.global.prepareSearchCriteria(event, this.searchCriteria));
  }

  removeItme(id: number) {
    this.beneficiaireService.deleteBeneficiaire(id).then(
      (response: any) => {
        //continued!!!
      }
    ).catch(
      (error: any) => {
        this.errorMsg = error;
      }
    )
  }

  showFormDialog(oldData = null) {
    this.displayDetailsDialog = false;
    this.selectedData = oldData;
    this.displayDialog = true;
    this.displayAllocationDialog = false;
    if (oldData) {
      this.modalTitle = 'Modifier d\'un bénéficiaire';
    } else {
      this.modalTitle = 'Ajout d\'un bénéficiaire';
    }
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.displayAllocationDialog = false;
    this.modalTitle = 'Recap Bénéficiaire';
  }

  showAllocationDialog() {
    this.displayDialog = false;
    this.displayDetailsDialog = false;
    this.displayAllocationDialog = true;
    this.modalTitle = 'Allouer un stock';
  }

  onDialogHide(event) {
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    this.displayAllocationDialog = event;
    this.selectedData = null;
  }

  search(event) {
    console.log('event', event);
    this.filteredNames = this.BeneficiaresFullName.filter(c => c.toLowerCase().includes(event.query.toLowerCase()));
  }

  onFilter() {
    if (this.selectName && this.selectName != null) {
      const firstName = this.selectName.split(' ').slice(0, -1).join(' ');
      const lastName = this.selectName.split(' ').slice(-1).join(' ');
      if (this.salaire) {
        this.beneficiaireService.getBeneficiairesByFilter(firstName, lastName, this.salaire);
      } else {
        this.beneficiaireService.getBeneficiairesByFilter(firstName, lastName);
      }
    } else {
      if (this.salaire) {
        this.beneficiaireService.getBeneficiairesByFilter(null, null, this.salaire);
      } else {
        this.beneficiaireService.getBeneficiaires();
      }

    }
  }
  onChange() {
    if (this.selectName == null || this.selectName == '') {
      if (this.salaire == null || !this.salaire) {
        this.beneficiaireService.getBeneficiaires();
      }
    }
  }
}
