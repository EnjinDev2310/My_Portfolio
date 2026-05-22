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
});
