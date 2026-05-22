import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills-component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 7 skill cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.skill-card');
    expect(cards.length).toBe(7);
  });

  it('each skill card should display the skill name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.skill-card');
    const names = Array.from(cards).map((card) =>
      (card as HTMLElement).querySelector('span')?.textContent?.trim(),
    );
    expect(names).toContain('Angular');
    expect(names).toContain('TypeScript');
    expect(names).toContain('HTML5');
  });

  it('skills should come from SSkills service', () => {
    const skills = component.skills;
    expect(skills.length).toBe(7);
    expect(skills[0].name).toBe('HTML5');
    expect(skills[6].name).toBe('Angular');
  });

  it('each skill should have a mat-icon with svgIcon binding', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBe(7);
  });
});
