import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegionModel } from '../models/region.model';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  baseUrl: string;
  regions: RegionModel[];
  searchCriteria: any;
  regionsSubject = new Subject<RegionModel[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.REGION_URL;
  }

  emitRegions() {
    this.regionsSubject.next(this.regions);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getRegions(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria= searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (regions: any) => {
        this.regions=regions['hydra:member'];
        this.emitTotalRecordsSubject(regions['hydra:totalItems'] as number);
        this.emitRegions();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getRegion(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (region: any) => {
            resolve(region);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addRegion(region: RegionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(region)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getRegions(this.searchCriteria);
            }else{
              this.getRegions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateRegion(region: RegionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl+ '/'  + region.id, JSON.stringify(region)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getRegions(this.searchCriteria);
            }else{
              this.getRegions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchRegion(region: RegionModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + '/' + region.id, JSON.stringify(region)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getRegions(this.searchCriteria);
            }else{
              this.getRegions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteRegion(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl+ '/'  + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getRegions(this.searchCriteria);
            }else{
              this.getRegions();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
