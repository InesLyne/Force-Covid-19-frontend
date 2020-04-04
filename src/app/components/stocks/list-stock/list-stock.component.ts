import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { Subscription, Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { SelectItem } from 'primeng/api';
import { CategoryService } from 'src/app/services/category.service';

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
  categorySubscription : Subscription;
  welfareSubscription: Subscription;

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
  products: SelectItem[] = [{label: 'Selectionnez un produit', value: 0}];
  filteredProducts: string[];
  selectProduct: any;
  categories: string[] = [];
  filteredCategories: string[];
  selectCategory: string;

  constructor(
    private stockService: StockService,
    private global: GlobalService,
    private categoryService : CategoryService) {
  }

  ngOnInit(): void {

    this.cols = [
      { field: 'welfare', header: 'Nom Produit' },
      { field: 'quantity', header: 'Description' },
      { field: 'created', header: 'Catégorie' },
      { field: 'updated', header: 'Poids' },
      { field: 'userId', header: 'Unté' },
      { field: 'userId', header: 'Quantité' },
      { field: 'userId', header: 'Dernière Mise à jour' }
    ];

    this.itemSubscription = this.stockService.stocksSubject.subscribe(
      (results: any[]) => {
        this.listItems = results;
        this.loading = false;
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

    this.categorySubscription = this.categoryService.categoriesSubject.subscribe(categories => {
      for(let item of categories){
        this.categories.push(item.name);
      }
    })
    this.welfareSubscription = this.stockService.getWelfares().subscribe(
      (welfares: any) => {
        let response = welfares['hydra:member'];
        for (let product of response){
          this.products.push({label: product.name, value: product.id})
        }
      }, (error: any) => {
        console.log(error);
      }
    )
    

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
    if(this.categorySubscription) { this.categorySubscription.unsubscribe() }

    if (this.welfareSubscription) {this.welfareSubscription.unsubscribe()}
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

  searchProduct(event) {
    console.log('event', event);
    //this.filteredProducts = this.products.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  searchCategory(event) {
    console.log('event', event);
    this.filteredCategories = this.categories.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  onFilter() {
    console.log("Produit Selected : "+this.selectProduct);
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
    if (this.selectProduct == null || this.selectProduct == '' || this.selectProduct == 0) {
      if (this.selectCategory == null || !this.selectCategory) {
        this.stockService.getStocks();
      }
    }
  }

}
