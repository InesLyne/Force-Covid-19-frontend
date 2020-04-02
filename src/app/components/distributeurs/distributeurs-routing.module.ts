import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDistributeurComponent } from './list-distributeur/list-distributeur.component';
import { DetailsDistributeurComponent } from './details-distributeur/details-distributeur.component';
import { FromDistributeurComponent } from './from-distributeur/from-distributeur.component';


const routes: Routes = [
  {
    path: '',
    component: ListDistributeurComponent
  },
  {
    path: ':id/details',
    component: DetailsDistributeurComponent
  },
  {
    path: ':id/form',
    component: FromDistributeurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributeursRoutingModule { }
