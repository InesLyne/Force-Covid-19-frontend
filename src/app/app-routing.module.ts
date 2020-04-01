import { LoginComponent } from './components/utilisateurs/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
	{
		path: 'stocks',
    loadChildren: './components/stocks/stocks.module#StocksModule',
    canLoad: [AuthGuardService]
  },
	{
		path: 'beneficiaires',
    loadChildren: './components/beneficiaires/beneficiaires.module#BeneficiairesModule',
    canLoad: [AuthGuardService]
  },
	{
		path: 'distributeurs',
    loadChildren: './components/distributeurs/distributeurs.module#DistributeursModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'utilisateurs',
    loadChildren: './components/utilisateurs/utilisateurs.module#UtilisateursModule'
  },
  {
    path: 'allocations',
    loadChildren: './components/allocations/allocations.module#AllocationsModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'livreurs',
    loadChildren: './components/livreurs/livreurs.module#LivreursModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'biens',
    loadChildren: './components/biens/biens.module#BiensModule',
    canLoad: [AuthGuardService]
  }
    //]//,
	//	canActivate: [AuthGuardService]
//	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
