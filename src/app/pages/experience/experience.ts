import { Component, inject } from '@angular/core';
import { SExperience } from '../../services/experience-service';
import { SCv } from '../../services/cv-service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly experienceService = inject(SExperience);
  readonly cvService = inject(SCv);
  readonly experiences = this.experienceService.experiences();
  readonly languages = this.cvService.profile().languages;
  readonly education = this.cvService.profile().education;
}
