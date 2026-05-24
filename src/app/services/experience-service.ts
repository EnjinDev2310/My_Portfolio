import { Injectable, Signal, signal } from '@angular/core';
import { IExperience } from '../models/iexperience';

@Injectable({
  providedIn: 'root',
})
export class SExperience {
  readonly #experience = signal<IExperience[]>([
    {
      period: '2026 — Actualidad',
      role: 'Desarrollador Frontend Junior',
      company: 'Agencia Digital · Remoto',
      description:
        'Desarrollo y mantenimiento de aplicaciones web SPA con Angular y TypeScript. Implementación de diseños responsivos con Tailwind CSS, integración con APIs REST, y optimización de rendimiento. Colaboración en equipo usando Git y metodologías ágiles.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'REST APIs'],
      current: true,
    },
    {
      period: '2025 — 2026',
      role: 'Desarrollador Freelance',
      company: 'Proyectos Varios',
      description:
        'Creación de sitios web y landing pages para clientes pequeños. Maquetación con HTML5, CSS3 y JavaScript vanilla. Migración de proyectos a frameworks modernos. Experiencia directa con requerimientos reales y plazos de entrega.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    },
    {
      period: '2024 — 2025',
      role: 'Trainee / Autodidacta',
      company: 'Formación Intensiva',
      description:
        'Bootcamp autodidacta de desarrollo frontend. Completé proyectos personales, contribuí a repositorios open source y construí mi portafolio desde cero. Fundamentos sólidos en algoritmos, estructura de datos y patrones de diseño.',
      tags: ['JavaScript', 'Git', 'Algoritmos', 'OOP'],
    },
  ]);
  readonly experiences: Signal<IExperience[]> = this.#experience.asReadonly();
}
