import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading!.textContent).toContain('Hola, soy EnjinDev');
  });

  it('should render skills-component child', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-skills-component')).toBeTruthy();
  });

  it('should have navigation links to projects and about', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a[routerLink]');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('should display the subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Frontend');
    expect(compiled.textContent).toContain('Developer');
  });
});
