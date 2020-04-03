import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
 
  dataStockCategories: any;
  dataSuiviStocks: any;
  dataPolarArea: any;
  dataBeneficiairesParRegions: any;
  labelDataRegions: string[]  = ['Dakar','Diourbel','Fatick','Kaffrine','Kaolack','Kédougou','Kolda','Louga','Matam','Saint-Louis','Sédhiou','Tambacounda','Thiès','Ziguinchor'];
  labelDataMonths: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  labelDataProductCategories: string[] = ['Céréales', 'Accessoires', 'Riz', 'Huiles', 'Détergents'];

  constructor() {

    this.dataSuiviStocks = {
        labels: this.labelDataMonths,
        datasets: [
            {
                label: 'Stock en entrée',
                data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Stock en sortie',
                data: [80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#565656'
            }]};

    this.dataStockCategories = {
        labels: this.labelDataProductCategories,
        datasets: [{
            data: [300, 50, 100, 230, 150], //numericData
            backgroundColor: [
                "#FF6384","#36A2EB","#FFCE56","#00CCCB","#25FDE9"
            ],
            hoverBackgroundColor: [
                "#FF6384","#36A2EB","#FFCE56","#00CCCB","#25FDE9"
            ]}]};

    this.dataPolarArea = {
        labels: [
            "Red","Green","Yellow","Grey","Blue" //labelData
        ],
        datasets: [{
            data: [     //numericData
                11,16,7,3,14
            ],
            backgroundColor: [
                "#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB"
            ],
            label: 'My dataset'
        }]};

        this.dataBeneficiairesParRegions = {
            labels: this.labelDataRegions,
            datasets: [
                {
                    label: 'Bénéficiaires',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40, 28]
                }]};
    }

    ngOnInit(): void {}


}