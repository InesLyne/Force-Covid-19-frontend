import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LineAllocationModel } from './../models/line-allocation.model';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class LineAllocationService {
  baseUrl: string;
  lineAllocations: LineAllocationModel[];
  searchCriteria: any;
  lienAllocationsSubject = new Subject<LineAllocationModel[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.LINE_ALLOCATION_URL;
  }

  emitLineAllocations() {
    this.lienAllocationsSubject.next(this.lineAllocations);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getLineAllocations(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (lineAllocations: any) => {
        this.lineAllocations=lineAllocations['hydra:member'];
        this.emitTotalRecordsSubject(lineAllocations['hydra:totalItems'] as number);
        this.emitLineAllocations();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getLineAllocation(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (lineAllocation: any) => {
            resolve(lineAllocation);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addLineAllocation(lineAllocation: LineAllocationModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(lineAllocation)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLineAllocations(this.searchCriteria);
            }else{
              this.getLineAllocations();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateLineAllocation(lineAllocation: LineAllocationModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl+ '/'  + lineAllocation.id, JSON.stringify(lineAllocation)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLineAllocations(this.searchCriteria);
            }else{
              this.getLineAllocations();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchLineAllocation(lineAllocation: LineAllocationModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl+ '/'  + lineAllocation.id, JSON.stringify(lineAllocation)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLineAllocations(this.searchCriteria);
            }else{
              this.getLineAllocations();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteLineAllocation(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getLineAllocations(this.searchCriteria);
            }else{
              this.getLineAllocations();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
