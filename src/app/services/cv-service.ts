import { Injectable, Signal, signal } from '@angular/core';
import { ICvProfile, ICvEducation, ICvLanguage, ICvSkill } from '../models/icv';

@Injectable({
  providedIn: 'root',
})
export class SCv {
  readonly #profile = signal<ICvProfile>({
    name: 'Jorge Luis Rodriguez Lorenzo',
    role: 'Frontend Developer',
    about: 'Ingeniero en formación con 4 años de estudios universitarios en Ingeniería Informática y 1.5 años de formación autodidacta intensiva en desarrollo frontend moderno. Dominio de HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, Angular, Git, npm y GitHub. Especializado en Angular y TypeScript para construir aplicaciones web SPA escalables y de alto rendimiento. Bilingüe — español nativo e inglés profesional.',
    education: [
      {
        degree: 'Ingeniería Informática',
        institution: 'Universidad',
        period: '2020 — 2024',
        description: '4 años de formación en ciencias de la computación, algoritmos, estructuras de datos y pensamiento lógico.',
      },
      {
        degree: 'Formación Autodidacta',
        institution: 'Online',
        period: '2024 — 2025',
        description: '1.5 años de estudio intensivo en desarrollo frontend moderno.',
      },
    ],
    languages: [
      { language: 'Español', level: 'Nativo' },
      { language: 'Inglés', level: 'Profesional' },
    ],
    skills: [
      { name: 'HTML5', category: 'frontend' },
      { name: 'CSS3', category: 'frontend' },
      { name: 'JavaScript', category: 'language' },
      { name: 'TypeScript', category: 'language' },
      { name: 'Tailwind', category: 'frontend' },
      { name: 'Git', category: 'tooling' },
      { name: 'Angular', category: 'frontend' },
      { name: 'GitBash', category: 'tooling' },
      { name: 'npm', category: 'tooling' },
      { name: 'GitHub', category: 'tooling' },
    ],
    experience: [
      {
        period: '2026 — Actualidad',
        role: 'Desarrollador Frontend Junior',
        company: 'Agencia Digital · Remoto',
        description:
          'Desarrollo y mantenimiento de aplicaciones web SPA escalables utilizando Angular y TypeScript. Maquetación de interfaces responsivas con Tailwind CSS siguiendo principios de diseño atómico. Integración con APIs REST y optimización de rendimiento mediante lazy loading y técnicas de code splitting. Colaboración activa en equipo utilizando Git con flujo de trabajo basado en ramas y metodologías ágiles.',
      },
      {
        period: '2025 — 2026',
        role: 'Desarrollador Freelance',
        company: 'Proyectos Varios',
        description:
          'Diseño y desarrollo de sitios web institucionales y landing pages para pequeñas y medianas empresas. Maquetación precisa con HTML5 semántico, CSS3 moderno y JavaScript vanilla. Migración exitosa de proyectos heredados a frameworks modernos, mejorando mantenibilidad y rendimiento. Gestión directa de requerimientos del cliente y cumplimiento de plazos de entrega.',
      },
      {
        period: '2024 — 2025',
        role: 'Trainee / Autodidacta',
        company: 'Formación Intensiva',
        description:
          'Formación intensiva autodidacta en desarrollo frontend moderno, completando más de 20 proyectos personales desde la planificación hasta el despliegue. Contribuciones a repositorios open source y construcción de portafolio profesional desde cero. Desarrollo de fundamentos sólidos en algoritmos, estructuras de datos, patrones de diseño y principios SOLID.',
      },
    ],
  });
  readonly profile: Signal<ICvProfile> = this.#profile.asReadonly();
}
