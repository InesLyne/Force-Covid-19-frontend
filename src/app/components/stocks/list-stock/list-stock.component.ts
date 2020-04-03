import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { Subscription, Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import {SelectItem} from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {
  listItems: Stock[];
  cols: any[];

  selectedItems: Stock[];
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  searchCriteria: SearchCriteria= new SearchCriteria();
  itemSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  displayDialog: boolean;
  selectedData: any;
  displayDetailsDialog: boolean;
  modalTitle: string;

  errorMsg: any;

  cities1: SelectItem[];
  cities2: SelectItem[];
  selectedCity1: City;
  selectedCity2: City;

  constructor(
    private stockService: StockService,
    private global: GlobalService) {
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
      { field: 'welfare.name', header: 'Nom Produit' },
      { field: 'welfare.description', header: 'Description' },
      { field: 'welfare.category', header: 'Catégorie' },
      { field: 'welfare.weight', header: 'Poids' },
      { field: 'welfare.unit', header: 'Unté' },
      { field: 'quantity', header: 'Quantité' },
      { field: 'updated', header: 'Dernière Mise à jour', type: 'date' }
    ];

    this.itemSubscription=this.stockService.stocksSubject.subscribe(
      (results: Stock[])=>{
        this.listItems=results;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.stockService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.stockService.getStocks(searchCriteria);
      }
    );
    this.stockService.getStocks(this.searchCriteria);
  
  }


  ngOnDestroy(){
    if(this.itemSubscription){
      this.itemSubscription.unsubscribe();
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
    this.stockService.deleteStock(id).then(
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
    if(oldData){
      this.modalTitle = 'Mettre à jour le Stock';
    }else{
      this.modalTitle = 'Ajout de Stock';
    }
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.modalTitle = 'Details de Stock';
  }

  onDialogHide(event) {
    console.log(event)
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    this.selectedData = null;
  }
  
}
