import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderNav } from './header-nav';

describe('HeaderNav', () => {
  let component: HeaderNav;
  let fixture: ComponentFixture<HeaderNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNav],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 5 navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('ul.nav-links a');
    expect(links.length).toBe(5);
  });

  it('nav links should come from NavService', () => {
    const links = component.links;
    expect(links.length).toBe(5);
    expect(links[0].label).toBe('Inicio');
    expect(links[4].label).toBe('Contacto');
  });

  it('mobile menu should start closed', () => {
    expect(component.isMenuOpen()).toBe(false);
  });

  it('toggleMenu should open and close the menu', () => {
    expect(component.isMenuOpen()).toBe(false);

    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);

    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('closeMenu should close the menu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);

    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should have a hamburger menu button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[aria-label="Toggle menu"]');
    expect(button).toBeTruthy();
  });
});
