import { TestBed } from '@angular/core/testing';

import { MyListService } from './my-list.service';

describe('MyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyListService = TestBed.get(MyListService);
    expect(service).toBeTruthy();
  });
});
