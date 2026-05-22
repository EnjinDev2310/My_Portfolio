import { Injectable, Signal, signal } from '@angular/core';
import { ISkills } from '../models/iskills';

@Injectable({
  providedIn: 'root',
})
export class SSkills {
  readonly #skills = signal<ISkills[]>([
    {
      name: 'HTML5',
      icon: 'html',
      class: '!text-orange-500 !size-10',
    },
    {
      name: 'CSS3',
      icon: 'css',
      class: '!text-violet-600 !size-10'
    },
    {
      name: 'JavaScript',
      icon: 'javascript',
      class: '!text-yellow-500 !size-10'
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
      class: '!text-sky-500 !size-10'
    },
    {
      name: 'Tailwind',
      icon: 'tailwind',
      class: '!text-cyan-400 !size-10'
    },
    {
      name: 'Git',
      icon: 'git',
      class: '!text-orange-400 !size-10'
    },
    {
      name: 'Angular',
      icon: 'angular',
      class: '!text-red-500 !size-10'
    },
  ]);
  readonly skills: Signal<ISkills[]> = this.#skills.asReadonly();
}
