import { TestBed } from '@angular/core/testing';

import { Icons } from './icons';

describe('Icons', () => {
  let service: Icons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Icons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have 13 icon names registered', () => {
    expect(service.icons.length).toBe(13);
    expect(service.icons).toContain('angular');
    expect(service.icons).toContain('typescript');
    expect(service.icons).toContain('discord');
    expect(service.icons).toContain('email');
  });
});
