import { Injectable, Signal, signal } from '@angular/core';
import { IProject } from '../models/iproject';

@Injectable({
  providedIn: 'root',
})
export class SProject {
  readonly #projects = signal<IProject[]>([
    {
      title: 'E-Commerce Dashboard',
      description:
        'Dashboard administrativo para una tienda online con gestión de productos, usuarios, estadísticas de ventas y autenticación segura.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'Git'],
      color: '#7C3AED',
    },

    {
      title: 'Task Manager App',
      description:
        'Aplicación para gestión de tareas con creación de proyectos, estados dinámicos, drag and drop y persistencia de datos.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Angular'],
      color: '#06B6D4',
    },

    {
      title: 'Weather Forecast Platform',
      description:
        'Plataforma del clima que consume APIs externas para mostrar pronósticos en tiempo real, búsquedas por ciudad y diseño responsive.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'API REST'],
      color: '#F59E0B',
    },

    {
      title: 'Developer Portfolio',
      description:
        'Portafolio profesional moderno con animaciones, proyectos destacados, formulario de contacto y diseño responsive.',
      tags: ['Angular', 'Tailwind', 'CSS3', 'Git'],
      color: '#10B981',
    },
  ]);
  readonly projects: Signal<IProject[]> = this.#projects.asReadonly();
}
