import { TestBed } from '@angular/core/testing';

import { InvestigatorService } from './investigator.service';

describe('InvestigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestigatorService = TestBed.get(InvestigatorService);
    expect(service).toBeTruthy();
  });
});
