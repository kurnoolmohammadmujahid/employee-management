import { TestBed } from '@angular/core/testing';

import { GetEmployeeListService } from './get-employee-list.service';

describe('GetEmployeeListService', () => {
  let service: GetEmployeeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmployeeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
