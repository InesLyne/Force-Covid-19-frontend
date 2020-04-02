import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Livreur } from './../models/livreur';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  baseUrl: string;
  livreurs: Livreur[];
  searchCriteria: any;
  livreursSubject = new Subject<Livreur[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.LIVREUR_URL;
  }

  emitLivreurs() {
    this.livreursSubject.next(this.livreurs);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getLivreurs(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (livreurs: any) => {
        this.livreurs=livreurs['hydra:member'];
        this.emitTotalRecordsSubject(livreurs['hydra:totalItems'] as number);
        this.emitLivreurs();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getLivreur(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (livreur: any) => {
            resolve(livreur);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addLivreur(livreur: Livreur) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(livreur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLivreurs(this.searchCriteria);
            }else{
              this.getLivreurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateLivreur(livreur: Livreur) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + livreur.id, JSON.stringify(livreur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLivreurs(this.searchCriteria);
            }else{
              this.getLivreurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchLivreur(livreur: Livreur) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + '/' + livreur.id, JSON.stringify(livreur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLivreurs(this.searchCriteria);
            }else{
              this.getLivreurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteLivreur(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLivreurs(this.searchCriteria);
            }else{
              this.getLivreurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
