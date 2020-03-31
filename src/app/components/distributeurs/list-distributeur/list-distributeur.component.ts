import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-distributeur',
  templateUrl: './list-distributeur.component.html',
  styleUrls: ['./list-distributeur.component.css']
})
export class ListDistributeurComponent implements OnInit, OnDestroy {
  
  listItems: Distributeur[];
  cols: any[];
  selectedItems: Distributeur[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  distributeurSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  errorMsg: any;

  constructor(private distributeurService: DistributeurService, private global: GlobalService) { }

  ngOnInit(): void {  
    this.cols = [
      { field: 'address', header: 'Adresse' },
      { field: 'geographicalArea', header: 'Zone geographique' },
      { field: 'storageCapacity', header: 'Capacité de stockage' },
      { field: 'latitude', header: 'Latitude' },
      { field: 'longitude', header: 'Longitude' }
    ];

    this.distributeurSubscription=this.distributeurService.distributeursSubject.subscribe(
      (distributeurs: Distributeur[])=>{
        this.listItems=distributeurs;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.distributeurService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.distributeurService.getDistributeurs(searchCriteria);
      }
    );
    this.distributeurService.getDistributeurs(this.searchCriteria);
  }

  ngOnDestroy(){
    if(this.distributeurSubscription){
      this.distributeurSubscription.unsubscribe();
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
    this.distributeurService.deleteDistributeur(id).then(
      (response: any)=>{
        //continued!!!
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

}