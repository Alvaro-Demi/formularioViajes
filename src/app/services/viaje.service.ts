import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viaje } from '../models/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private viajesSubject = new BehaviorSubject<Viaje[]>([]);
  private viajeEditandoSubject = new BehaviorSubject<Viaje | null>(null);

  constructor() {
    this.cargarViajes();
  }

  private cargarViajes() {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    this.viajesSubject.next(viajes);
  }

  getViajes(): Observable<Viaje[]> {
    return this.viajesSubject.asObservable();
  }

  getViajeEditando(): Observable<Viaje | null> {
    return this.viajeEditandoSubject.asObservable();
  }

  guardarViaje(viaje: Viaje) {
    const viajes = this.viajesSubject.value;
    if (viaje.id) {
      // Editar viaje existente
      const index = viajes.findIndex(v => v.id === viaje.id);
      if (index !== -1) {
        viajes[index] = viaje;
      }
    } else {
      // Nuevo viaje
      viaje.id = Date.now();
      viajes.push(viaje);
    }
    localStorage.setItem('viajes', JSON.stringify(viajes));
    this.viajesSubject.next(viajes);
    this.viajeEditandoSubject.next(null);
  }

  eliminarViaje(id: number) {
    const viajes = this.viajesSubject.value.filter(v => v.id !== id);
    localStorage.setItem('viajes', JSON.stringify(viajes));
    this.viajesSubject.next(viajes);
  }

  editarViaje(viaje: Viaje) {
    this.viajeEditandoSubject.next({...viaje});
  }
} 