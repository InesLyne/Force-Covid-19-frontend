import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  user: User;
  logged: boolean;
  showMenu: boolean;
  
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    
  ) { 
    
  }

  ngOnInit(): void {
    this.showMenu = false;
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: [''],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem',
      },
      { separator: true },
      {
        label: 'Stock',
        icon: 'pi pi-images',
        routerLink: ['stocks'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      { separator: true },
      {
        label: 'Distributeurs',
        icon: 'pi pi-users',
        routerLink: ['distributeurs'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      { separator: true },
      {
        label: 'Bénéficiaires',
        icon: 'pi pi-id-card',
        routerLink: ['beneficiaires'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      { separator: true },
      {
        label: 'Statistiques',
        icon: 'pi pi-chart-bar',
        styleClass: 'customItem'
      },
      { separator: true },
    ];

    this.user = this.authService.getCurrentUser();
    this.logged = this.user != null;
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu)
  }

  logout() {
    this.authService.setToken(null);
    this.authService.setUser(null);
    this.user = null;
  }
}
