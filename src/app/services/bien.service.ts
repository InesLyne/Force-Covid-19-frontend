import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Bien } from './../models/bien';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class BienService {
  baseUrl: string;
  biens: Bien[];
  searchCriteria: any;
  biensSubject = new Subject<Bien[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.BIEN_URL;
  }

  emitBiens() {
    this.biensSubject.next(this.biens);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getBiens(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (biens: any) => {
        this.biens=biens['hydra:member'];
        this.emitTotalRecordsSubject(biens['hydra:totalItems'] as number);
        this.emitBiens();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getBien(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (bien: any) => {
            resolve(bien);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addBien(bien: Bien) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(bien)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBiens(this.searchCriteria);
            }else{
              this.getBiens();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateBien(bien: Bien) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + bien.id, JSON.stringify(bien)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBiens(this.searchCriteria);
            }else{
              this.getBiens();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchBien(bien: Bien) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl+ '/'  + bien.id, JSON.stringify(bien)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBiens(this.searchCriteria);
            }else{
              this.getBiens();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteBien(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl + '/' + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBiens(this.searchCriteria);
            }else{
              this.getBiens();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
