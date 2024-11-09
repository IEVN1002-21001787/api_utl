import { TestBed } from '@angular/core/testing';

import { MenssageserviceService } from './menssageservice.service';

describe('MenssageserviceService', () => {
  let service: MenssageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenssageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
