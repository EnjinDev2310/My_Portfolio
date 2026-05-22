import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyects } from './proyects';

describe('Proyects', () => {
  let component: Proyects;
  let fixture: ComponentFixture<Proyects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyects],
    }).compileComponents();

    fixture = TestBed.createComponent(Proyects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 project cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBe(4);
  });

  it('should display the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('Proyectos');
  });

  it('exposes projects from SProject service', () => {
    const projects = component.projects;
    expect(projects.length).toBe(4);
    expect(projects[0].title).toBe('E-Commerce Dashboard');
    expect(projects[3].title).toBe('Developer Portfolio');
  });

  it('each project should have tags displayed', () => {
    const projects = component.projects;
    projects.forEach((p) => {
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });
});
