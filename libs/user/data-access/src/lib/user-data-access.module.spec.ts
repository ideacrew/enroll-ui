import { async, TestBed } from '@angular/core/testing';
import { UserDataAccessModule } from './user-data-access.module';

describe('UserDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserDataAccessModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UserDataAccessModule).toBeDefined();
  });
});
