import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { Subscription, Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { SelectItem } from 'primeng/api';

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
  totalRecords: number = 0;
  searchCriteriaSubject = new Subject<SearchCriteria>();
  searchCriteria: SearchCriteria = new SearchCriteria();
  itemSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  displayDialog: boolean;
  selectedData: any;
  displayDetailsDialog: boolean;
  displayStockManagerDialog: boolean;
  modalTitle: string;
  errorMsg: any;

  cities1: SelectItem[];
  cities2: SelectItem[];
  selectedCity1: City;
  selectedCity2: City;
  products: string[] = [];
  filteredProducts: string[];
  selectProduct: string;
  categories: string[] = [];
  filteredCategories: string[];
  selectCategory: string;

  constructor(
    private stockService: StockService,
    private global: GlobalService) {
  }

  ngOnInit(): void {

    this.cols = [
      { field: 'welfare.name', header: 'Nom Produit' },
      { field: 'welfare?.description', header: 'Description' },
      { field: 'welfare?.category', header: 'Catégorie' },
      { field: 'welfare?.weight', header: 'Poids' },
      { field: 'welfare?.unit', header: 'Unté' },
      { field: 'quantity', header: 'Quantité' },
      { field: 'updated', header: 'Dernière Mise à jour', type: 'date' }
    ];

    this.itemSubscription = this.stockService.stocksSubject.subscribe(
      (results: any[]) => {
        this.listItems = results;
        this.loading = false;
        if (this.products.length <= 0) {
          for (let stock of results) {
            /*En supposant que les champs "product" et "category" existent dans la BDD et désignent 
              respectivement le nom du produit et la catégorie
            */
            if (stock.product) { this.products.push(stock.product); }
            if (stock.category) { this.categories.push(stock.category); }
          }
        }
      }
    );
    this.totalRecordsSubscription = this.stockService.totalRecordsSubject.subscribe(
      (totalRecords: number) => {
        this.totalRecords = totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription = this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria) => {
        console.log(this.searchCriteria)
        this.stockService.getStocks(searchCriteria);
      }
    );
    this.stockService.getStocks(this.searchCriteria);

  }
  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
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
    this.stockService.deleteStock(id).then(
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
    this.displayStockManagerDialog = false;
    this.selectedData = oldData;
    this.displayDialog = true;
    if (oldData) {
      this.modalTitle = 'Mettre à jour le Stock';
    } else {
      this.modalTitle = 'Ajout de Stock';
    }
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.displayStockManagerDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.modalTitle = 'Details de Stock';
  }

  showStockManagerFormDialog(data){
    this.displayDialog = false;
    this.displayDetailsDialog = false;
    this.selectedData = data;
    this.displayStockManagerDialog = true;
    this.modalTitle = 'Gestionnaire de Stock';
  }
  onDialogHide(event) {
    this.displayStockManagerDialog = event;
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    this.selectedData = null;
  }

  searchProduct(event) {
    console.log('event', event);
    this.filteredProducts = this.products.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  searchCategory(event) {
    console.log('event', event);
    this.filteredCategories = this.categories.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  onFilter() {
    if (this.selectProduct && this.selectProduct != null) {
      if (this.selectCategory) {
        this.stockService.getStocksByFilter(this.selectProduct, this.selectCategory);
      } else {
        this.stockService.getStocksByFilter(this.selectProduct);
      }
    } else {
      if (this.selectCategory) {
        this.stockService.getStocksByFilter(null, this.selectCategory);
      }
    }
  }
  onChange() {
    if (this.selectProduct == null || this.selectProduct == '') {
      if (this.selectCategory == null || !this.selectCategory) {
        this.stockService.getStocks();
      }
    }
  }

}
