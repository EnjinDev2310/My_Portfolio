import { TestBed } from '@angular/core/testing';

import { SExperience } from './experience-service';

describe('SExperience', () => {
  let service: SExperience;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SExperience);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 3 experiences', () => {
    const experiences = service.experiences();
    expect(experiences.length).toBe(3);
  });

  it('first experience should have current: true', () => {
    const experiences = service.experiences();
    expect(experiences[0].current).toBe(true);
  });

  it('each experience should have required fields', () => {
    const experiences = service.experiences();
    experiences.forEach((exp) => {
      expect(exp.period).toBeDefined();
      expect(exp.role).toBeDefined();
      expect(exp.company).toBeDefined();
      expect(exp.description).toBeDefined();
      expect(exp.tags).toBeInstanceOf(Array);
    });
  });

  it('second experience should be Desarrollador Freelance', () => {
    const experiences = service.experiences();
    expect(experiences[1].role).toBe('Desarrollador Freelance');
    expect(experiences[1].current).toBeUndefined();
  });
});
