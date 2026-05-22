import { Component } from '@angular/core';
import { SSocial } from '../../services/ssocial';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-social-icons',
  imports: [MatIcon],
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.css',
})
export class SocialIcons {
  readonly social;
  constructor(readonly socialService: SSocial) {
    this.social = this.socialService.social()
  }
}
