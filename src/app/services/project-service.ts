import { Injectable, Signal, signal } from '@angular/core';
import { IProject } from '../models/iproject';

@Injectable({
  providedIn: 'root',
})
export class SProject {
  readonly #projects = signal<IProject[]>([
    {
      title: 'League of Legends App',
      description:
        'Explorador interactivo de personajes, lore y skins de League of Legends usando la API oficial DDragon. Búsqueda dinámica, filtros por rol y visualización detallada de cada campeón.',
      tags: ['Angular', 'TypeScript', 'API REST', 'CSS3', 'GitHub Pages'],
      color: '#9430E6',
      gitUrl: 'https://github.com/EnjinDev2310/League_of_Legends_App',
      webUrl: 'https://enjindev2310.github.io/League_of_Legends_App/',
    },
    {
      title: 'Developer Portfolio',
      description:
        'Portafolio profesional moderno con animaciones, proyectos destacados, formulario de contacto y diseño responsive. Construido con Angular 21 y Tailwind CSS 4.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'CSS3', 'Git'],
      color: '#10B981',
      gitUrl: 'https://github.com/EnjinDev2310/My_Portfolio',
      webUrl: 'https://enjindev2310.github.io/My_Portfolio/',
    },
    {
      title: 'Bar-App',
      description: 'Aplicación de gestión de bar construida con Angular CLI.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'CSS3'],
      color: '#3B82F6',
      gitUrl: 'https://github.com/EnjinDev2310/Bar-App',
    },
    {
      title: 'Tienda-App',
      description: 'Sistema de punto de venta (POS) para pequeños comercios. SQLite via WASM en el navegador, sin backend.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'SQLite', 'WASM'],
      color: '#F59E0B',
      gitUrl: 'https://github.com/EnjinDev2310/Tienda-App-Shop-App',
    },
  ]);
  readonly projects: Signal<IProject[]> = this.#projects.asReadonly();
}
