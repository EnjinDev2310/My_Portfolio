import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class Icons {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  icons: string[] = ['angular', 'css', 'git', 'html', 'javascript', 'tailwind', 'typescript'];

  constructor() {
    this.registerIcons();
  }
  private registerIcons(): void {
    this.icons.forEach((iconName) => {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`),
      );
    });
  }
}
