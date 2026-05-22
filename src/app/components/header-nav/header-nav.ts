import { Component, signal } from '@angular/core';
import { NavService } from '../../services/nav-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.css',
})
export class HeaderNav {
  readonly links;

  readonly isMenuOpen = signal(false);

  constructor(readonly navService: NavService) {
    this.links = this.navService.links();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
