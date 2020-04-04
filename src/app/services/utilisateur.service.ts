import { User } from './../models/user';
import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  baseUrl: string;
  utilisateurs: User[];
  searchCriteria: any;
  utilisateursSubject = new Subject<User[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.UTILISATEUR_URL;
  }

  emitUtilisateurs() {
    this.utilisateursSubject.next(this.utilisateurs);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getUtilisateurs(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria= searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (utilisateurs: any) => {
        this.utilisateurs=utilisateurs['hydra:member'];
        this.emitTotalRecordsSubject(utilisateurs['hydra:totalItems'] as number);
        this.emitUtilisateurs();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }


  async getUtilisateursForDropdown() {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl).subscribe(
          (response: any) => {
            let utilisateurs=response['hydra:member'] as any[];
            if(utilisateurs && utilisateurs.length>0){
              utilisateurs=utilisateurs.map(
                (utilisateur: User)=>{
                  return {label:utilisateur.fullname, value:utilisateur}
                }
              );
            }
            utilisateurs.unshift({label: 'Sélectionner un utilisateur', value: {}});
            resolve(utilisateurs);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async getUtilisateur(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + id).subscribe(
          (utilisateur: any) => {
            resolve(utilisateur);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addUtilisateur(utilisateur: User) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(utilisateur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getUtilisateurs(this.searchCriteria);
            }else{
              this.getUtilisateurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateUtilisateur(utilisateur: User) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + utilisateur.id, JSON.stringify(utilisateur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getUtilisateurs(this.searchCriteria);
            }else{
              this.getUtilisateurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchUtilisateur(utilisateur: User) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl+ '/'  + utilisateur.id, JSON.stringify(utilisateur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getUtilisateurs(this.searchCriteria);
            }else{
              this.getUtilisateurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteUtilisateur(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getUtilisateurs(this.searchCriteria);
            }else{
              this.getUtilisateurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
