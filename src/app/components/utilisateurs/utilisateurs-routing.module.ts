import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { DetailsUtilisateurComponent } from './details-utilisateur/details-utilisateur.component';
import { FromLivreurComponent } from '../livreurs/from-livreur/from-livreur.component';


const routes: Routes = [
  {
    path: '',
    component: ListUtilisateurComponent
  },
  {
    path: ':id/details',
    component: DetailsUtilisateurComponent
  },
  {
    path: ':id/form',
  component: FromLivreurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
