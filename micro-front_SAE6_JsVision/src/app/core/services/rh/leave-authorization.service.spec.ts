import { TestBed } from '@angular/core/testing';

import { LeaveAuthorizationService } from './leave-authorization.service';

describe('LeaveAuthorizationService', () => {
  let service: LeaveAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
