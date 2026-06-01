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
      url: 'https://discord.com/users/doritosonmyway'
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      url: 'https://instagram.com'
    },
    {
      name: 'GitHub',
      icon: 'github',
      color: '#c9d1d9',
      url: 'https://github.com/EnjinDev2310'
    },
    {
      name: 'Linkedin',
      icon: 'linkedin',
      color: '#0A66C2',
      url: 'https://www.linkedin.com/in/jorge-luis-rodriguez-lorenzo-enjin-dev'
    },
    {
      name: 'Reddit',
      icon: 'reddit',
      color: '#FF4500',
      url: 'https://reddit.com/user/Leonheardth'
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      color: '#0088CC',
      url: 'https://t.me/EnjinDev'
    },
  ]);
  readonly social: Signal<ISocial[]> = this.#social.asReadonly();
}
