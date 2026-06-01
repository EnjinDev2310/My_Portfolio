import { Component, inject, signal } from '@angular/core';
import { NavService } from '../../services/nav-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header-nav',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.css',
})
export class HeaderNav {
  readonly router = inject(Router);
  readonly links;
  constructor(readonly navService: NavService) {
    this.links = this.navService.links();
  }
  readonly isMenuOpen = signal(false);
  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
  downloadCv(): void {
    this.closeMenu();
    this.router.navigate(['/cv']);
  }
}
