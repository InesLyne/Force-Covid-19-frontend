import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SubdivisionModel } from './../models/subdivision.model';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {
  baseUrl: string;
  subdivisions: SubdivisionModel[];
  searchCriteria: any;
  subdivisionsSubject = new Subject<SubdivisionModel[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.SUBDIVISION_URL;
  }

  emitSubdivisions() {
    this.subdivisionsSubject.next(this.subdivisions);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getSubdivisions(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (subdivisions: any) => {
        this.subdivisions=subdivisions['hydra:member'];
        this.emitTotalRecordsSubject(subdivisions['hydra:totalItems'] as number);
        this.emitSubdivisions();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getSubdivision(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + id).subscribe(
          (subdivision: any) => {
            resolve(subdivision);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addSubdivition(subdivision: SubdivisionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(subdivision)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getSubdivisions(this.searchCriteria);
            }else{
              this.getSubdivisions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateSubdivision(subdivision: SubdivisionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl+ '/'  + subdivision.id, JSON.stringify(subdivision)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getSubdivisions(this.searchCriteria);
            }else{
              this.getSubdivisions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchSubdivision(subdivision: SubdivisionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl+ '/'  + subdivision.id, JSON.stringify(subdivision)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getSubdivisions(this.searchCriteria);
            }else{
              this.getSubdivisions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteSubdivision(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getSubdivisions(this.searchCriteria);
            }else{
              this.getSubdivisions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
