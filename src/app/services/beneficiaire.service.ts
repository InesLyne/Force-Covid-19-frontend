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

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.BENEFICIAIRE_URL;
  }

  emitBeneficiaires() {
    this.beneficiairessSubject.next(this.beneficiaires);
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
        this.beneficiaires=beneficiaires
        this.emitBeneficiaires();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
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
}
