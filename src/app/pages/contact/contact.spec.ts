import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render social-icons child component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-social-icons')).toBeTruthy();
  });

  it('should render email link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailLink = compiled.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
    expect(emailLink!.textContent).toContain('Rodriguez.Lorenzo');
  });

  it('should render mat-icon with email svgIcon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBeGreaterThanOrEqual(1);
  });
});
