import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Viaje } from '../../models/viaje.model';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-viaje-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">{{ esEdicion ? 'Editar Viaje' : 'Nuevo Viaje' }}</h2>
              <form (ngSubmit)="guardarViaje()" #viajeForm="ngForm">
                <div class="mb-3">
                  <label for="origen" class="form-label">Origen:</label>
                  <input type="text" class="form-control" id="origen" name="origen" [(ngModel)]="viaje.origen" required>
                </div>
                
                <div class="mb-3">
                  <label for="destino" class="form-label">Destino:</label>
                  <input type="text" class="form-control" id="destino" name="destino" [(ngModel)]="viaje.destino" required>
                </div>
                
                <div class="mb-3">
                  <label for="fechaInicio" class="form-label">Fecha Inicio:</label>
                  <input type="date" class="form-control" id="fechaInicio" name="fechaInicio" [(ngModel)]="viaje.fechaInicio" required>
                </div>
                
                <div class="mb-3">
                  <label for="fechaFin" class="form-label">Fecha Fin:</label>
                  <input type="date" class="form-control" id="fechaFin" name="fechaFin" [(ngModel)]="viaje.fechaFin" required>
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" [disabled]="!viajeForm.form.valid">
                    {{ esEdicion ? 'Actualizar' : 'Guardar' }} Viaje
                  </button>
                  <button type="button" class="btn btn-secondary" (click)="cancelar()">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ViajeFormComponent implements OnInit {
  viaje: Viaje = {
    id: 0,
    origen: '',
    destino: '',
    fechaInicio: '',
    fechaFin: ''
  };
  esEdicion = false;

  constructor(
    private viajeService: ViajeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viajeService.getViajeEditando().subscribe(viaje => {
      if (viaje) {
        this.viaje = {...viaje};
        this.esEdicion = true;
      }
    });
  }

  guardarViaje() {
    this.viajeService.guardarViaje(this.viaje);
    this.router.navigate(['/viajes']);
  }

  cancelar() {
    this.router.navigate(['/viajes']);
  }
} 