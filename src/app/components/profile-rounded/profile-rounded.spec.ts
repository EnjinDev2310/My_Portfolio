import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRounded } from './profile-rounded';

describe('ProfileRounded', () => {
  let component: ProfileRounded;
  let fixture: ComponentFixture<ProfileRounded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRounded],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRounded);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an image with alt text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img!.getAttribute('alt')).toBe('enjin.dev');
  });

  it('should display the profile picture', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img!.getAttribute('src')).toContain('profile1.png');
  });
});
