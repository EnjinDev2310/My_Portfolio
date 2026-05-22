import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIcons } from './social-icons';

describe('SocialIcons', () => {
  let component: SocialIcons;
  let fixture: ComponentFixture<SocialIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialIcons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 social links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.social-link');
    expect(links.length).toBe(5);
  });

  it('each link should have aria-label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.social-link');
    links.forEach((link) => {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('social data should come from SSocial service', () => {
    const social = component.social;
    expect(social.length).toBe(5);
    expect(social[0].name).toBe('Discord');
    expect(social[4].name).toBe('Telegram');
  });

  it('each social link should have target="_blank" and rel="noopener"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.social-link');
    links.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener');
    });
  });
});
