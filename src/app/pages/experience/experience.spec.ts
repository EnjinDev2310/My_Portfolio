import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experience } from './experience';

describe('Experience', () => {
  let component: Experience;
  let fixture: ComponentFixture<Experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experience],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 experience entries', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const entries = compiled.querySelectorAll('[class*="mb-10"]');
    expect(entries.length).toBe(3);
  });

  it('first entry should have current badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const currentBadge = compiled.querySelector('[class*="rounded-full"]');
    expect(currentBadge).toBeTruthy();
  });

  it('should display the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('Experiencia');
  });

  it('exposes experiences from SExperience service', () => {
    const experiences = component.experiences;
    expect(experiences.length).toBe(3);
    expect(experiences[0].role).toBeDefined();
    expect(experiences[0].company).toBeDefined();
  });
});
