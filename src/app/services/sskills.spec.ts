import { TestBed } from '@angular/core/testing';

import { SSkills } from './sskills';

describe('SSkills', () => {
  let service: SSkills;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSkills);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 7 skill items', () => {
    const skills = service.skills();
    expect(skills.length).toBe(7);
  });

  it('each item should have name, icon, class', () => {
    const skills = service.skills();
    skills.forEach((skill) => {
      expect(skill.name).toBeDefined();
      expect(skill.icon).toBeDefined();
      expect(skill.class).toBeDefined();
    });
  });

  it('Angular item should have a red text class', () => {
    const skills = service.skills();
    const angular = skills.find((s) => s.name === 'Angular');
    expect(angular).toBeDefined();
    expect(angular!.class).toContain('text-red-500');
  });

  it('first skill should be HTML5', () => {
    const skills = service.skills();
    expect(skills[0].name).toBe('HTML5');
    expect(skills[0].icon).toBe('html');
  });
});
