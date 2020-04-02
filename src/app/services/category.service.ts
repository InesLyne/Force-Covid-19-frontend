import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CategoryModel } from './../models/category.model';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string;
  categories: CategoryModel[];
  searchCriteria: any;
  categoriesSubject = new Subject<CategoryModel[]>();
  totalRecordsSubject = new Subject<number>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.CATEGORY_URL;
  }

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }

  emitTotalRecordsSubject(total: number) {
    this.totalRecordsSubject.next(total);
  }

  getCategories(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (categories: any) => {
        this.categories=categories['hydra:member'];
        this.emitTotalRecordsSubject(categories['hydra:totalItems'] as number);
        this.emitCategories();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getCategory(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + '/' +  id).subscribe(
          (category: any) => {
            resolve(category);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addCategory(category: CategoryModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(category)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getCategories(this.searchCriteria);
            }else{
              this.getCategories();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateCategory(category: CategoryModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + '/' + category.id, JSON.stringify(category)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getCategories(this.searchCriteria);
            }else{
              this.getCategories();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async patchCategory(category: CategoryModel) {
    return new Promise(
      (resolve, reject) => {
        this.http.patch<any>(this.baseUrl + '/' + category.id, JSON.stringify(category)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getCategories(this.searchCriteria);
            }else{
              this.getCategories();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteCategory(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl + '/' + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getCategories(this.searchCriteria);
            }else{
              this.getCategories();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}
