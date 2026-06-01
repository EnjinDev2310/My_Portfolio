import { TestBed } from '@angular/core/testing';

import { SProject } from './project-service';

describe('SProject', () => {
  let service: SProject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SProject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 2 projects', () => {
    const projects = service.projects();
    expect(projects.length).toBe(2);
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

  it('first project should be League of Legends App', () => {
    const projects = service.projects();
    expect(projects[0].title).toBe('League of Legends App');
    expect(projects[0].color).toBe('#9430E6');
  });

  it('Developer Portfolio should be the last project', () => {
    const projects = service.projects();
    const last = projects[projects.length - 1];
    expect(last.title).toBe('Developer Portfolio');
    expect(last.tags).toContain('Angular');
  });
});
