import { Subject } from 'rxjs';
import { Beneficiaire } from './../models/beneficiaire';
import { GlobalService } from './../global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {
  baseUrl: string;
  beneficiaires: Beneficiaire[];
  beneficiairessSubject = new Subject<Beneficiaire[]>();
  searchCriteria: any;
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.BENEFICIAIRE_URL;
  }

  emitBeneficiaires() {
    this.beneficiairessSubject.next(this.beneficiaires);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getBeneficiaires(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (beneficiaires: any) => {
        this.beneficiaires=beneficiaires['hydra:member'];
        this.emitTotalRecordsSubject(beneficiaires['hydra:totalItems'] as number);
        this.emitBeneficiaires();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    );
    this.loadFakeData();
    this.emitBeneficiaires();
  }

  async getBeneficiaire(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + id).subscribe(
          (beneficiaire: any) => {
            resolve(beneficiaire);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addBeneficiaire(beneficiaire: Beneficiaire) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(beneficiaire)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBeneficiaires(this.searchCriteria);
            }else{
              this.getBeneficiaires();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateBeneficiaire(beneficiaire: Beneficiaire) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + beneficiaire.id, JSON.stringify(beneficiaire)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBeneficiaires(this.searchCriteria);
            }else{
              this.getBeneficiaires();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchBeneficiaire(beneficiaire: Beneficiaire) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + beneficiaire.id, JSON.stringify(beneficiaire)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBeneficiaires(this.searchCriteria);
            }else{
              this.getBeneficiaires();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteBeneficiaire(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getBeneficiaires(this.searchCriteria);
            }else{
              this.getBeneficiaires();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  loadFakeData() {
    this.beneficiaires = [];
    for (let i = 1; i <= 20; i++) {
      let bene = new Beneficiaire();
      bene.id =  i;
      bene.firstName = 'Nom ' + i;
      bene.lastName = 'Prenom ' + i;
      bene.mobileNumber = 'piece D Identite' + i;
      bene.mobileNumber = 'telephone ' + i;
      this.beneficiaires.push(bene);
    }
    this.emitTotalRecordsSubject(20);
  }
}
