import { GlobalService } from 'src/app/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Allocation } from './../models/allocation';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AllocationService {
  baseUrl: string;

  allocations: Allocation[];
  allocationsSubject = new Subject<Allocation[]>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.ALLOCATION_URL;
  }

  emitAllocations() {
    this.allocationsSubject.next(this.allocations);
  }

  async getAllocations() {
    this.http.get<any>(this.baseUrl).subscribe(
      (allocations: any) => {
        this.allocations=allocations
        this.emitAllocations();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }


  async getAllocation(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + id).subscribe(
          (allocation: any) => {
            resolve(allocation);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addAllocation(allocation: Allocation) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(allocation)).subscribe(
          (response: any) => {
            resolve(response);
            this.getAllocations();
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateAllocation(allocation: Allocation) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + allocation.id, JSON.stringify(allocation)).subscribe(
          (response: any) => {
            resolve(response);
            this.getAllocations();
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteAllocation(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl + id).subscribe(
          (response: any) => {
            resolve(response);
            this.getAllocations();
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

}
