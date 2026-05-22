import { Component, inject } from '@angular/core';
import { SExperience } from '../../services/sexperience';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly experienceService = inject(SExperience);
  readonly experiences = this.experienceService.experiences();
}
