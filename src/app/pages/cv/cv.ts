import { Component, inject } from '@angular/core';
import { SCv } from '../../services/cv-service';
import { SProject } from '../../services/project-service';

@Component({
  selector: 'app-cv',
  imports: [],
  templateUrl: './cv.html',
  styleUrl: './cv.css',
})
export class CvPage {
  readonly cv = inject(SCv).profile;
  readonly projects = inject(SProject).projects;

  printCv(): void {
    window.print();
  }
}
