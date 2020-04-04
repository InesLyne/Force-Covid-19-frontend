import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Benefdistributeur } from '../models/benef.distributeur';
import { EntreSortie } from '../models/entree.sortie';
import { ProductCategory } from '../models/categorie.produit';
import { AllocationParMois } from '../models/allocation.parmois';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  baseUrl: string;
  benefdistributeur: Benefdistributeur;
  entresortie: EntreSortie;
  categorieProduit: ProductCategory;
  allocationMensuels: AllocationParMois;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.STATISTIC_URL;
  }

  getNbreBenefDistribParRegion() {
    this.http.get(`${this.baseUrl}/benef-distrib`).subscribe(res => 
      this.benefdistributeur = res as Benefdistributeur,
    (err: HttpErrorResponse) => 
        console.log("Error occured.")
    );
    /**-------------------------------------------------*/
    const data:any = this.loadDataBenefDistrib();
    this.benefdistributeur = data as Benefdistributeur;
    /**---------------------------------------------------- */
    return  this.benefdistributeur;
  }

  getSuiviStockParMois() {
    this.http.get(`${this.baseUrl}/entree-sortie`).subscribe(res => 
      this.entresortie = res as EntreSortie,
    (err: HttpErrorResponse) => 
        console.log("Error occured.")
    );
    /**-------------------------------------------------*/
    const data:any = this.loadDataEntreeSortie();
    this.entresortie = data as EntreSortie;
    /**---------------------------------------------------- */
    return this.entresortie;
  }

  getProductCategories() {
    this.http.get(`${this.baseUrl}/categorie-produit`).subscribe(res => 
      this.categorieProduit = res as ProductCategory,
    (err: HttpErrorResponse) => 
        console.log("Error occured.")
    );
    /**-------------------------------------------------*/
    const data:any = this.loadDataProductCategories();
    this.categorieProduit = data as ProductCategory;
    /**---------------------------------------------------- */
    return this.categorieProduit;
  }

  getAllocationsParMois() {
    this.http.get(`${this.baseUrl}/allocations`).subscribe(res => 
      this.allocationMensuels = res as AllocationParMois,
    (err: HttpErrorResponse) => 
        console.log("Error occured.")
    );
    /**-------------------------------------------------*/
    const data:any = this.loadDataAllocationMois();
    this.allocationMensuels = data as AllocationParMois;
    /**---------------------------------------------------- */
    return this.allocationMensuels;
  }

  loadDataBenefDistrib(){
    return {
      "regions": ['Dakar','Diourbel','Fatick','Kaffrine','Kaolack','Kédougou','Kolda','Louga','Matam','Saint-Louis','Sédhiou','Tambacounda','Thiès','Ziguinchor'],
      "beneficiaires": [ 28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40, 28],
      "distributeurs": [ 40, 19, 28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56 ]
    };
  }

  loadDataEntreeSortie(){
    return {
      "mois": ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      "entrees": [ 28, 48, 86, 27, 90, 59, 80, 81, 56, 55, 40, 28],
      "sorties": [ 40, 19, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56 ]
    };
  }

  loadDataProductCategories(){
    return {
      "categories": ['Céréales', 'Accessoires', 'Riz', 'Huiles', 'Détergents'],
      "nbreproduits": [300, 50, 250, 230, 150]
    };
  }

  loadDataAllocationMois(){
    return {
      "mois": ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      "nbreallocations": [ 28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 90, 65],
    };
  }

}
