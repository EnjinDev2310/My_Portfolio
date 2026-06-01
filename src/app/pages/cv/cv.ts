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
        // Restore nav and footer visibility after printing
        const header = document.querySelector('app-header-nav') as HTMLElement | null;
        const footer = document.querySelector('app-footer') as HTMLElement | null;
        if (header) header.style.display = '';
        if (footer) footer.style.display = '';
        this.router.navigate(['/']);
      });
    }
  }

  printCv(): void {
    // Force-hide nav and footer so they don't overlap the print layout
    const header = document.querySelector('app-header-nav') as HTMLElement | null;
    const footer = document.querySelector('app-footer') as HTMLElement | null;
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    // Small delay to let DOM settle before print dialog opens
    setTimeout(() => window.print(), 50);
  }
}
