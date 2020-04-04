import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Stock } from './../models/stock';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl: string;
  stocks: Stock[];
  searchCriteria: any;
  stocksSubject = new Subject<Stock[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.STOCK_URL;
    this.getStocks();
  }

  emitStocks() {
    this.stocksSubject.next(this.stocks);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getStocks(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria= searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (stocks: any) => {
        this.stocks=stocks['hydra:member'];
        this.emitTotalRecordsSubject(stocks['hydra:totalItems'] as number);
        this.emitStocks();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getStock(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' + id).subscribe(
          (stock: any) => {
            resolve(stock);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addStock(stock: Stock) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(stock)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getStocks(this.searchCriteria);
            }else{
              this.getStocks();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateStock(stock: Stock) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + stock.id, JSON.stringify(stock)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getStocks(this.searchCriteria);
            }else{
              this.getStocks();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchStock(stock: Stock) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl+ '/'  + stock.id, JSON.stringify(stock)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getStocks(this.searchCriteria);
            }else{
              this.getStocks();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteStock(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getStocks(this.searchCriteria);
            }else{
              this.getStocks();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  getStocksByFilter(product: string, category?: string){
    let url : string;
    if(product!=null){
      url = `${this.baseUrl}?product=${product}`;
      if(category){
        url = `${url}&category=${category}`;
      }
    } else {
      url = `${this.baseUrl}`;
      if(category){
        url = `${url}?category=${category}`;
      }
    }
    this.http.get<any>(url).subscribe(
      (stocks: any) => {
        this.stocks=stocks['hydra:member'];
        this.emitTotalRecordsSubject(stocks['hydra:totalItems'] as number);
        this.emitStocks();
      }, (error: any) => {
        console.log(error);
      }
    )
  }
}
