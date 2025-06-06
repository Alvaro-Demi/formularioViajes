import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Viaje } from '../../models/viaje.model';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-viaje-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let viaje of viajes">
          <div class="card viaje-card">
            <div class="card-body">
              <h5 class="card-title">{{ viaje.destino }}</h5>
              <p class="card-text">
                <strong>Origen:</strong> {{ viaje.origen }}<br>
                <strong>Fecha Inicio:</strong> {{ viaje.fechaInicio | date:'dd/MM/yyyy' }}<br>
                <strong>Fecha Fin:</strong> {{ viaje.fechaFin | date:'dd/MM/yyyy' }}
              </p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary" (click)="editarViaje(viaje)">Editar</button>
                <button class="btn btn-danger" (click)="eliminarViaje(viaje.id)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ViajeListComponent implements OnInit {
  viajes: Viaje[] = [];

  constructor(
    private viajeService: ViajeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viajeService.getViajes().subscribe(viajes => {
      this.viajes = viajes;
    });
  }

  editarViaje(viaje: Viaje) {
    this.viajeService.editarViaje(viaje);
    this.router.navigate(['/nuevo-viaje']);
  }

  eliminarViaje(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
      this.viajeService.eliminarViaje(id);
    }
  }
} 