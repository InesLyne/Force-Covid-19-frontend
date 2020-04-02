import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DepartementModel } from '../models/departement.model';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  baseUrl: string;
  departements: DepartementModel[];
  searchCriteria: any;
  departementsSubject = new Subject<DepartementModel[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.DEPARTEMENT_URL;
  }

  emitDepartements() {
    this.departementsSubject.next(this.departements);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getDepartements(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (departements: any) => {
        this.departements=departements['hydra:member'];
        this.emitTotalRecordsSubject(departements['hydra:totalItems'] as number);
        this.emitDepartements();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getDepartement(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (departement: any) => {
            resolve(departement);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addDepartement(departement: DepartementModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(departement)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDepartements(this.searchCriteria);
            }else{
              this.getDepartements();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateDepartement(departement: DepartementModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl+ '/'  + departement.id, JSON.stringify(departement)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDepartements(this.searchCriteria);
            }else{
              this.getDepartements();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchDepartement(departement: DepartementModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + '/' + departement.id, JSON.stringify(departement)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDepartements(this.searchCriteria);
            }else{
              this.getDepartements();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteDepartement(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDepartements(this.searchCriteria);
            }else{
              this.getDepartements();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
