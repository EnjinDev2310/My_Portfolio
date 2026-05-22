import { Injectable, Signal, signal } from '@angular/core';
import { ISocial } from '../models/isocial';

@Injectable({
  providedIn: 'root',
})
export class SSocial {
  readonly #social = signal<ISocial[]>([
    {
      name: 'Discord',
      icon: 'discord',
      color: '#5865F2',
      url: 'https://discord.com'
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      url: 'https://instagram.com'
    },
    {
      name: 'Linkedin',
      icon: 'linkedin',
      color: '#0A66C2',
      url: 'https://linkedin.com'
    },
    {
      name: 'Reddit',
      icon: 'reddit',
      color: '#FF4500',
      url: 'https://reddit.com'
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      color: '#0088CC',
      url: 'https://t.me'
    },
  ]);
  readonly social: Signal<ISocial[]> = this.#social.asReadonly();
}
