import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { HeaderNav } from './components/header-nav/header-nav';
import { Icons } from './services/icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, HeaderNav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
  private icons = inject (Icons)
}
