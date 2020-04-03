import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.STATISTIC_URL;
  }

  
}
