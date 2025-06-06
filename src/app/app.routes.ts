import { Routes } from '@angular/router';
import { ViajeFormComponent } from './components/viaje-form/viaje-form.component';
import { ViajeListComponent } from './components/viaje-list/viaje-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/viajes', pathMatch: 'full' },
  { path: 'viajes', component: ViajeListComponent },
  { path: 'nuevo-viaje', component: ViajeFormComponent }
];
