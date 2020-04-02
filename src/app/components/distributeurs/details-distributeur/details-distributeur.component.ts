import { ActivatedRoute } from '@angular/router';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Distributeur } from 'src/app/models/distributeur';

@Component({
  selector: 'app-details-distributeur',
  templateUrl: './details-distributeur.component.html',
  styleUrls: ['./details-distributeur.component.css']
})
export class DetailsDistributeurComponent implements OnInit {
  distributeur: Distributeur;
  @Input() id: any;
  @Output() displayChange = new EventEmitter<boolean>();
  errorMsg: any;
  
  constructor(private distributeurService: DistributeurService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.id)
      this.onGetDistributeur(this.id);
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

  onDialogHide() {
    this.distributeur = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}
