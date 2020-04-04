import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-list-distributeur',
  templateUrl: './list-distributeur.component.html',
  styleUrls: ['./list-distributeur.component.css']
})
export class ListDistributeurComponent implements OnInit, OnDestroy {

  listItems: Distributeur[];
  cols: any[];
  selectedItems: Distributeur[];
  searchCriteria: SearchCriteria = new SearchCriteria();
  totalRecords: number = 0;
  searchCriteriaSubject = new Subject<SearchCriteria>();
  distributeurSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  displayDialog: any;
  selectedData: any;
  displayDetailsDialog: boolean;
  modalTitle: string;

  errorMsg: any;
  selectedCity1: City;
  selectedCity2: City;
  DistributeurFullName: string[] = [];
  distributors: SelectItem[] = [{label: 'Selectionnez', value: 0}];
  filteredNames: string[];
  selectName: any;
  Zones: SelectItem[] = [{label: 'Selectionnez', value: 0}];
  filteredZones: string[];
  selectZone: any;

  constructor(private distributeurService: DistributeurService, private global: GlobalService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: '.manager?.fullname', header: 'Nom & Prenom', type: 'fullName' },
      { field: 'manager?.identityNumber', header: 'N° CNI', type: 'cni' },
      { field: 'address', header: 'Magazin' },
      { field: 'geographicalArea', header: 'Zone Octroyée', type: 'gArea' },
      /* { field: 'longitude', header: 'Bénéficiaire Octroyé'}, */
      { field: 'longitude', header: 'Coordonnées GPS', type: 'gps' }
    ];

    this.distributeurSubscription = this.distributeurService.distributeursSubject.subscribe(
      (distributeurs: any[]) => {
        this.listItems = distributeurs;
        this.loading = false;
        if(this.DistributeurFullName.length <= 0){
          for (let distributeur of distributeurs) {
            this.DistributeurFullName.push(`${distributeur.manager.fullname}`);
            this.distributors.push({label: distributeur.manager.fullname, value: distributeur.manager.id});
            for (let area of distributeur.geographicalArea){
              this.Zones.push({label: area.name, value: area.id});
            } 
          }
        }
      }
    );
    this.totalRecordsSubscription = this.distributeurService.totalRecordsSubject.subscribe(
      (totalRecords: number) => {
        this.totalRecords = totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription = this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria) => {
        console.log(this.searchCriteria)
        this.distributeurService.getDistributeurs(searchCriteria);
      }
    );
    this.distributeurService.getDistributeurs(this.searchCriteria);
  }

  ngOnDestroy() {
    if (this.distributeurSubscription) {
      this.distributeurSubscription.unsubscribe();
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
    this.distributeurService.deleteDistributeur(id).then(
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
    this.modalTitle = oldData ? 'Modifier un distributeur' : 'Ajout un distributeur';
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.modalTitle = 'Détails du distributeur';
  }

  onDialogHide(event) {
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    console.log('Here')
    this.selectedData = null;
  }

  search(event) {
    console.log('event', event);
    this.filteredNames = this.DistributeurFullName.filter(c => c.toLowerCase().includes(event.query.toLowerCase()));
  }

  searchZones(event) {
    console.log('event', event);
    //this.filteredZones = this.Zones.filter(c => c.toLowerCase().includes(event.query.toLowerCase()));
  }

  onFilter() {
    console.log("Selected Zone"+ this.selectZone);
    console.log("Selected Name"+ this.selectName);
    if (this.selectName && this.selectName != 0) {
      /* const firstName = this.selectName.split(' ').slice(0, -1).join(' ');
      const lastName = this.selectName.split(' ').slice(-1).join(' '); */
      if (this.selectZone!=0) {
        this.distributeurService.getDistributeursByFilter(this.selectName, this.selectZone);
      } else {
        this.distributeurService.getDistributeursByFilter(this.selectName);
      }
    } else {
      if (this.selectZone!=0) {
        this.distributeurService.getDistributeursByFilter(null, this.selectZone);
      } else {
        this.distributeurService.getDistributeurs();
      }

    }
  }
  onChange() {
    if (this.selectName == null || this.selectName == 0) {
      if (this.selectZone == null || !this.selectZone || this.selectZone ==0) {
        this.distributeurService.getDistributeurs();
      }
    }
  }

  onParseGeographicalArea(geographicalArea: any[]): string{
    if(geographicalArea && geographicalArea.length>0){
      return geographicalArea.map((x: any)=> x['name']).join(', ');
    }
    return '';
  }

}