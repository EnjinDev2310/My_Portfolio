import { Injectable, Signal, signal } from '@angular/core';
import { IExperience } from '../models/iexperience';

@Injectable({
  providedIn: 'root',
})
export class SExperience {
  readonly #experience = signal<IExperience[]>([
    {
      period: '2026 — Actualidad',
      role: 'Desarrollador Fullstack Junior',
      company: 'Agencia Digital · Remoto',
      description:
        'Desarrollo y mantenimiento de aplicaciones web fullstack utilizando Angular y TypeScript en frontend, Node.js y APIs REST en backend. Maquetación de interfaces responsivas con Tailwind CSS siguiendo principios de diseño atómico. Integración con bases de datos PostgreSQL y Supabase, optimización de rendimiento mediante lazy loading y técnicas de code splitting. Colaboración activa en equipo utilizando Git con flujo de trabajo basado en ramas y metodologías ágiles.',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'REST APIs', 'Node.js', 'PostgreSQL'],
      current: true,
    },
    {
      period: '2025 — 2026',
      role: 'Desarrollador Freelance',
      company: 'Proyectos Varios',
      description:
        'Diseño y desarrollo de sitios web institucionales y landing pages para pequeñas y medianas empresas. Maquetación precisa con HTML5 semántico, CSS3 moderno y JavaScript vanilla. Migración exitosa de proyectos heredados a frameworks modernos, mejorando mantenibilidad y rendimiento. Gestión directa de requerimientos del cliente y cumplimiento de plazos de entrega.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    },
    {
      period: '2024 — 2025',
      role: 'Trainee / Autodidacta',
      company: 'Formación Intensiva',
      description:
        'Formación intensiva autodidacta en desarrollo frontend moderno, completando más de 20 proyectos personales desde la planificación hasta el despliegue. Contribuciones a repositorios open source y construcción de portafolio profesional desde cero. Desarrollo de fundamentos sólidos en algoritmos, estructuras de datos, patrones de diseño y principios SOLID.',
      tags: ['JavaScript', 'Git', 'Algoritmos', 'OOP'],
    },
  ]);
  readonly experiences: Signal<IExperience[]> = this.#experience.asReadonly();
}
