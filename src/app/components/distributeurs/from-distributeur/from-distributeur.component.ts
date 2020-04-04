import { UtilisateurService } from './../../../services/utilisateur.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';

@Component({
  selector: 'app-from-distributeur',
  templateUrl: './from-distributeur.component.html',
  styleUrls: ['./from-distributeur.component.css']
})
export class FromDistributeurComponent implements OnInit {
  distributeur: Distributeur;
  @Input() id: any;
  @Output() displayChange = new EventEmitter<boolean>();
  errorMsg: any;
  successMsg: any;

  managers: any;
  
  constructor(private distributeurService: DistributeurService, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetDistributeur(this.id);
    } else {
      this.distributeur = new Distributeur();
    }

    this.onGetUtilisateursForDropdown();
    /* this.managers = [
      {label: 'Selectionnner un manager', value: null},
      {label: 'Modou khoulé', value: '/api/users/25'},
      {label: 'Mbaye Traoré', value: '/api/users/26'},
      {label: 'Ameth Gaye', value: '/api/users/27'},
  ]; */
  }

  onGetDistributeur(id: string){
    this.distributeurService.getDistributeur(id).then(
      (distributeur: Distributeur)=>{
        this.distributeur=distributeur;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onAddDistributeur(){
    this.distributeurService.addDistributeur(this.distributeur).then(
      (response: any)=>{
        this.successMsg= response;
        this.onDialogHide();
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onUpdateDistributeur(){
    this.distributeurService.updateDistributeur(this.distributeur).then(
      (response: any)=>{
        this.successMsg= response;
        this.onDialogHide();
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onSubmit() {
    if (this.id) {
      this.onUpdateDistributeur();
    } else {
      this.onAddDistributeur();
    }
  }

  onGetUtilisateursForDropdown(){
    this.utilisateurService.getUtilisateursForDropdown().then(
      (utilisateurs: any[])=>{
        this.managers=utilisateurs;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onPushGeographicalArea(){
    let geoArea: any= {name:''};
    this.distributeur.geographicalArea.push(geoArea);
  }

  trackByFn = (index, item) => item.id;

  onRemoveGeographicalArea(index: number){
    this.distributeur.geographicalArea.splice(index,1);
  }

  onDialogHide() {
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}
