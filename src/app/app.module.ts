import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';

import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

/**
 * PRIMENG
 */
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HelpersModule } from './modules/helpers/helpers.module';
import { FileService } from './modules/helpers/file/file.service';
import { RequestCacheService } from './modules/helpers/services/request-cache.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CachingInterceptorService } from './modules/helpers/services/caching-interceptor.service';
import { BeneficiairesModule } from './components/beneficiaires/beneficiaires.module';
import { AllocationsModule } from './components/allocations/allocations.module';
import { BiensModule } from './components/biens/biens.module';
import { DistributeursModule } from './components/distributeurs/distributeurs.module';
import { StocksModule } from './components/stocks/stocks.module';
import { UtilisateursModule } from './components/utilisateurs/utilisateurs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    HelpersModule,
    BeneficiairesModule,
    BiensModule,
    AllocationsModule,
    DistributeursModule,
    StocksModule,
    UtilisateursModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DialogModule
  ],
  providers: [
    DatePipe,
    FileService,
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
