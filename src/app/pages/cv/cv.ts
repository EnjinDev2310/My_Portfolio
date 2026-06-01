import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SCv } from '../../services/cv-service';
import { SProject } from '../../services/project-service';

@Component({
  selector: 'app-cv',
  imports: [],
  templateUrl: './cv.html',
  styleUrl: './cv.css',
})
export class CvPage {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  readonly cv = inject(SCv).profile;
  readonly projects = inject(SProject).projects;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('afterprint', () => {
        this.router.navigate(['/']);
      });
      setTimeout(() => window.print(), 500);
    }
  }
}
