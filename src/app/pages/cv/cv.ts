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
    // Force-hide nav and footer so they don't overlap the print layout
    const header = document.querySelector('app-header-nav') as HTMLElement | null;
    const footer = document.querySelector('app-footer') as HTMLElement | null;
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    window.print();
  }
}
