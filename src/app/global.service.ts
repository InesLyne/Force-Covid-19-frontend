import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from './models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  BASE_API_URL = `${environment.apiUrl}`;

  ADMINISTRATOR = 'administrator';
  ROOT = 'ROOT';
  USERS_URL = this.BASE_API_URL + '/users';
  /* USER_REGISTER_URL = this.BASE_API_URL + '/auth/register'; */
  USER_LOGIN_URL = (this.BASE_API_URL.substring(0,this.BASE_API_URL.length - 4) )+ '/authentication_token';
  USER_LOGOUT_URL = this.BASE_API_URL + '/users/logout';
  ALLOCATION_URL=this.BASE_API_URL+'/allocations';
  BENEFICIAIRE_URL=this.BASE_API_URL+'/beneficiaries';
  BIEN_URL=this.BASE_API_URL+'/welfares';
  CATEGORY_URL=this.BASE_API_URL+'/categories';
  DEPARTEMENT_URL=this.BASE_API_URL+'/departments';
  DISTRIBUTEUR_URL=this.BASE_API_URL+'/distributors';
  LINE_ALLOCATION_URL=this.BASE_API_URL+'/line_allocations';
  LIVREUR_URL=this.BASE_API_URL+'/delivery_men';
  REGION_URL=this.BASE_API_URL+'/regions';
  STOCK_URL=this.BASE_API_URL+'/stocks';
  SUBDIVISION_URL=this.BASE_API_URL+'/subdivisions';
  UTILISATEUR_URL=this.BASE_API_URL+'/users';
  STATISTIC_URL = this.BASE_API_URL+'/statistics';


  UPLOAD_FILE = '/upload/images';
  DOWNLOAD_FILE = this.BASE_API_URL + '/files/download/images';
  FILE = this.BASE_API_URL + '/files';
  
  constructor() { }

  public prepareUrlWithSearchCriteria(url: string, filter: SearchCriteria): string {
    url = url + '?page=' + filter.page + '&size=' + filter.size;
    if(filter.key && filter.key.length){
      url = url + '&key=' + filter.key.trim() +'&operator=' + filter.operation.trim()+ '&value=' + filter.value;
    }
    if(filter.orderBy && filter.orderBy.length){
      url = url + '&orderBy=' + filter.orderBy.trim()+ '&orderDirection=' + filter.orderDirection; 
    }
    if(filter.searchKey && filter.searchKey.length){
      url = url + '&searchKey=' + filter.searchKey.trim(); 
    }
    if(filter.categories && filter.categories.length > 0){
      url = url + '&categories=' + filter.categories;
    }
    return url;
  } 


  public prepareSearchCriteria(event: any, searchCriteria: SearchCriteria): SearchCriteria{
    if(event){
      console.log(event);
      if(event.sortField){
        searchCriteria.orderBy=event.sortField;
      }
      if(event.sortOrder){
        searchCriteria.orderDirection=event.sortOrder;
      }
      if(event.first){
        searchCriteria.page=(event.first / searchCriteria.size)+1;
      }
      if(event.rows){
  
      }
    }
    return searchCriteria;
  }

  public formatedCurentDate():string{
    return (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])+'+00:00'
  }

  
}