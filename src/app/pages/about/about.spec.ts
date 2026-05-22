import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 metrics', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const metricCards = compiled.querySelectorAll('.grid > div');
    expect(metricCards.length).toBe(3);
  });

  it('first metric should be "20+" with label "Proyectos"', () => {
    expect(component.metrics[0].value).toBe('20+');
    expect(component.metrics[0].label).toBe('Proyectos');
  });

  it('should render profile-rounded child component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-profile-rounded')).toBeTruthy();
  });

  it('should display the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('enjin.dev');
  });
});
