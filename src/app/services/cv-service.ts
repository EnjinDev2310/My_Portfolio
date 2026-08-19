import { Injectable, Signal, signal } from '@angular/core';
import { ICvProfile, ICvEducation, ICvLanguage, ICvSkill } from '../models/icv';

@Injectable({
  providedIn: 'root',
})
export class SCv {
  readonly #profile = signal<ICvProfile>({
    name: 'Jorge Luis Rodriguez Lorenzo',
    role: 'Fullstack Developer',
    email: 'eabominable@gmail.com',
    photo: 'img/profile/profile3.png',
    github: 'https://github.com/EnjinDev2310',
    linkedin: 'https://www.linkedin.com/in/jorge-luis-rodriguez-lorenzo-enjin-dev',
    about: 'Ingeniero en formación con 4 años de estudios universitarios en Ingeniería Informática, 1.5 años de formación autodidacta intensiva en desarrollo frontend moderno y formación complementaria en backend y bases de datos. Dominio de HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, Angular, Node.js, Supabase, PostgreSQL, Docker, Git, npm y GitHub. Especializado en Angular y TypeScript para construir aplicaciones web SPA escalables y de alto rendimiento, con experiencia en APIs, bases de datos y arquitecturas fullstack. Bilingüe — español nativo e inglés profesional.',
    education: [
      {
        degree: 'Estudios Universitarios en Ingeniería Informática (4 años cursados)',
        institution: 'Universidad Hermanos Saiz',
        period: '2020 — 2024',
        description: 'Formación en ciencias de la computación, algoritmos, estructuras de datos y desarrollo de software.',
      },
      {
        degree: 'Formación Autodidacta',
        institution: 'Online',
        period: '2024 — 2025',
        description: 'Un año y medio de estudios intensivos en desarrollo frontend moderno.',
      },
      {
        degree: 'Formación en Backend y Bases de Datos',
        institution: 'Online',
        period: '2025 — 2026',
        description: 'Estudios intensivos en desarrollo backend, bases de datos relacionales y no relacionales, y arquitectura de APIs.',
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
      { name: 'MySQL', category: 'database' },
      { name: 'MongoDB', category: 'database' },
      { name: 'C#', category: 'language' },
      { name: 'WPF', category: 'tooling' },
      { name: '.NET', category: 'tooling' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Supabase', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'Docker', category: 'backend' },
    ],
    experience: [
      {
        period: '2026 — Actualidad',
        role: 'Desarrollador Fullstack Junior',
        company: 'Agencia Digital · Remoto',
        description:
          'Desarrollo y mantenimiento de aplicaciones web fullstack utilizando Angular y TypeScript en frontend, Node.js y APIs REST en backend. Maquetación de interfaces responsivas con Tailwind CSS siguiendo principios de diseño atómico. Integración con bases de datos PostgreSQL y Supabase, optimización de rendimiento mediante lazy loading y técnicas de code splitting. Colaboración activa en equipo utilizando Git con flujo de trabajo basado en ramas y metodologías ágiles.',
      },
      {
        period: '2025 — 2026',
        role: 'Proyectos Freelance',
        company: 'Independiente',
        description:
          'Desarrollo de sitios web y aplicaciones para clientes independientes.',
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
