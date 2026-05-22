import { TestBed } from '@angular/core/testing';

import { NavService } from './nav-service';

describe('NavService', () => {
  let service: NavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 5 navigation links', () => {
    const links = service.links();
    expect(links.length).toBe(5);
  });

  it('each link should have path and label properties', () => {
    const links = service.links();
    links.forEach((link) => {
      expect(link.path).toBeDefined();
      expect(typeof link.path).toBe('string');
      expect(link.label).toBeDefined();
      expect(typeof link.label).toBe('string');
    });
  });

  it('first link should be Inicio at root path', () => {
    const links = service.links();
    expect(links[0]).toEqual({ path: '/', label: 'Inicio' });
  });

  it('last link should be Contacto', () => {
    const links = service.links();
    expect(links[links.length - 1]).toEqual({ path: '/contact', label: 'Contacto' });
  });
});
