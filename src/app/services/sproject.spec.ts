import { TestBed } from '@angular/core/testing';

import { SProject } from './sproject';

describe('SProject', () => {
  let service: SProject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SProject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 4 projects', () => {
    const projects = service.projects();
    expect(projects.length).toBe(4);
  });

  it('each project should have title, description, tags, color', () => {
    const projects = service.projects();
    projects.forEach((project) => {
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.tags).toBeInstanceOf(Array);
      expect(project.color).toBeDefined();
    });
  });

  it('first project should be E-Commerce Dashboard', () => {
    const projects = service.projects();
    expect(projects[0].title).toBe('E-Commerce Dashboard');
    expect(projects[0].color).toBe('#7C3AED');
  });

  it('Developer Portfolio should be the last project', () => {
    const projects = service.projects();
    const last = projects[projects.length - 1];
    expect(last.title).toBe('Developer Portfolio');
    expect(last.tags).toContain('Angular');
  });
});
