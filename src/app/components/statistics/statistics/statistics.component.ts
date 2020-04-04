import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import { Benefdistributeur } from 'src/app/models/benef.distributeur';
import { EntreSortie } from 'src/app/models/entree.sortie';
import { ProductCategory } from 'src/app/models/categorie.produit';
import { FilterUtils } from 'primeng/utils/public_api';
import { AllocationParMois } from 'src/app/models/allocation.parmois';
import { SelectItem } from 'primeng/api/selectitem';

interface Product {
    name: string;
    code: string;
}

interface Region {
    name: string;
    code: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
 
  dataSuiviStocks: any;
  dataAllocationsTemps: any;
  dataBenefDistribParRegion: any;
  dataStockProductCategories: any;

  dataEntreeSortie: EntreSortie;
  dataProductCategories: ProductCategory;
  dataBenefDistrib: Benefdistributeur;
  dataAllocationMois: AllocationParMois;
  
  tabColors: String[] = ["#FF6384","#36A2EB","#FFCE56","#00CCCB","#25FDE9","#E7E9ED","#4BC0C0",'#82C46C','#18391E',
 '#9FE855','#568203','#096A09','#C2F732', '#00FF00','#18391E','#95A595','#22780F', '#B0F2B6','#01D758','#00561B','#175732']

  selectedProduct: Product;
  products:SelectItem[] = [
    {label:'Select City', value:null},
    {label:'Périssable', value:{id:1, name: 'Périssable', code: 'perissable'}},
    {label:'Nom Périssable', value:{id:2, name: 'Non Périssable', code: 'nonperissable'}},
    {label:'Espèces', value:{id:3, name: 'Espèces', code: 'especes'}}
  ];

  selectedRegion: Product;
  regions:SelectItem[] = [
    {label:'Select City', value:null},
    {label:'Dakar', value:{id:1, name: 'Dakar', code: 'dakar'}},
    {label:'Diourbel', value:{id:2, name: 'Diourbel', code: 'Diourbel'}},
    {label:'Kaffrine', value:{id:3, name: 'Kaffrine', code: 'Kaffrine'}},
    {label:'Kédougou', value:{id:4, name: 'Kédougou', code: 'Kédougou'}},
    {label:'Kolda', value:{id:5, name: 'Kolda', code: 'Kolda'}}
  ];

  constructor(private statisticService: StatisticService) {}

  suiviAllocationByRegion(){
    this.dataAllocationMois = this.statisticService.getAllocationsParMoisForRegion(this.selectedRegion.name);
    this.dataAllocationsTemps = {
        labels: this.dataAllocationMois.mois,
        datasets: [{
                label: 'Stock en entrée',
                data: this.dataAllocationMois.nbreallocations,
                fill: false,
                borderColor: '#9FE855'
            }]};
  }

  suiviByCategory(){
    this.dataEntreeSortie = this.statisticService.getSuiviStockByCategory(this.selectedProduct.name);
    this.dataSuiviStocks = {
        labels: this.dataEntreeSortie.mois,
        datasets: [
            {
                label: 'Stock en entrée',
                data: this.dataEntreeSortie.entrees,
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Stock en sortie',
                data: this.dataEntreeSortie.sorties,
                fill: false,
                borderColor: '#565656'
            }]};
  }

  ngOnInit(): void {

    this.dataBenefDistrib = this.statisticService.getNbreBenefDistribParRegion();
    this.dataEntreeSortie = this.statisticService.getSuiviStockParMois();
    this.dataProductCategories = this.statisticService.getProductCategories();
    this.dataAllocationMois = this.statisticService.getAllocationsParMois();

    this.dataSuiviStocks = {
        labels: this.dataEntreeSortie.mois,
        datasets: [
            {
                label: 'Stock en entrée',
                data: this.dataEntreeSortie.entrees,
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Stock en sortie',
                data: this.dataEntreeSortie.sorties,
                fill: false,
                borderColor: '#565656'
            }]};

    this.dataStockProductCategories = {
        labels: this.dataProductCategories.categories,
        datasets: [{
            data: this.dataProductCategories.nbreproduits,
            backgroundColor: this.tabColors,
            hoverBackgroundColor: this.tabColors}]};

    this.dataAllocationsTemps = {
        labels: this.dataAllocationMois.mois,
        datasets: [{
                label: 'Stock en entrée',
                data: this.dataAllocationMois.nbreallocations,
                fill: false,
                borderColor: '#9FE855'
            }]};

        this.dataBenefDistribParRegion = {
            labels: this.dataBenefDistrib.regions,
            datasets: [
                {
                    label: 'Bénéficiaires',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: this.dataBenefDistrib.beneficiaires,
                },{
                    label: 'Distributeurs',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: this.dataBenefDistrib.distributeurs,
                }]};
    }

}