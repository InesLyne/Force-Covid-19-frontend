import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { DetailsUtilisateurComponent } from './details-utilisateur/details-utilisateur.component';
import { FormUtilisateurComponent } from './form-utilisateur/form-utilisateur.component';
import { LoginComponent } from './login/login.component';
import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ListUtilisateurComponent,
    DetailsUtilisateurComponent,
    FormUtilisateurComponent,
    LoginComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    UtilisateursRoutingModule,
  ]
})
export class UtilisateursModule { }
