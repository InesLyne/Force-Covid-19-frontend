import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Distributeur } from './../models/distributeur';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class DistributeurService {
  baseUrl: string;
  distributeurs: Distributeur[];
  searchCriteria: any;
  distributeursSubject = new Subject<Distributeur[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.DISTRIBUTEUR_URL;
    this.getDistributeurs();
  }

  emitDistributeurs() {
    this.distributeursSubject.next(this.distributeurs);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getDistributeurs(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (distributeurs: any) => {
        this.distributeurs=distributeurs['hydra:member'];
        this.emitTotalRecordsSubject(distributeurs['hydra:totalItems'] as number);
        this.emitDistributeurs();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
    /* this.loadFakeData();
    this.emitDistributeurs(); */
  }

  async getDistributeur(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (distributeur: any) => {
            resolve(distributeur);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addDistributeur(distributeur: Distributeur) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(distributeur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateDistributeur(distributeur: Distributeur) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + distributeur.id, JSON.stringify(distributeur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchDistributeur(distributeur: Distributeur) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + '/' + distributeur.id, JSON.stringify(distributeur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteDistributeur(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  getDistributeursByFilter(firstname: string, lastname:string, zone?: string){
    let url : string;
    if(firstname!=null && lastname!=null){
      url = `${this.baseUrl}?firstName=${firstname}&lastName=${lastname}`;
      if(zone){
        url = `${url}&geographicalArea=${zone}`;
      }
    } else {
      url = `${this.baseUrl}`;
      if(zone){
        url = `${url}?geographicalArea=${zone}`;
      }
    }
    this.http.get<any>(url).subscribe(
      (distributeurs: any) => {
        this.distributeurs=distributeurs['hydra:member'];
        this.emitTotalRecordsSubject(distributeurs['hydra:totalItems'] as number);
        this.emitDistributeurs();
      }, (error: any) => {
        console.log(error);
      }
    )
  }
  /* loadFakeData() {
    this.distributeurs = [];
    for (let i = 1; i <= 20; i++) {
      let bene = new Distributeur();
      bene.id =  i;
      bene.geographicalArea = 'geographicalArea ' + i;
      bene.address = 'address ' + i;
      bene.storageCapacity = 'storageCapacity ' + i;
      bene.longitude =  i;
      bene.latitude =  i;
      this.distributeurs.push(bene);
    }
    this.emitTotalRecordsSubject(20);
  } */

}

