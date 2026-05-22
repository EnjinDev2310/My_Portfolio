import { Injectable, Signal, signal } from '@angular/core';
import { INav } from '../models/inav';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  readonly #links = signal<INav[]>([
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Sobre Mi' },
    { path: '/experience', label: 'Experiencia' },
    { path: '/proyects', label: 'Proyectos' },
    { path: '/contact', label: 'Contacto' },
  ]);
  readonly links: Signal<INav[]> = this.#links.asReadonly();
}
