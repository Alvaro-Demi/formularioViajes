import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="header-container">
      <h1 class="titulo-principal">Mis Viajes</h1>
      <nav class="navbar navbar-expand-lg">
        <div class="container justify-content-center">
          <div class="nav-links">
            <a routerLink="/viajes" class="nav-link me-4">Ver Viajes</a>
            <a routerLink="/nuevo-viaje" class="nav-link">Nuevo Viaje</a>
          </div>
        </div>
      </nav>
    </div>

    <div class="main-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'mis-viajes-app';
}
