import { Component } from '@angular/core';
import { SocialIcons } from '../../components/social-icons/social-icons';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [SocialIcons, MatIcon],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {}
