import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListMobileComponent } from './my-list-mobile.component';

describe('MyListMobileComponent', () => {
  let component: MyListMobileComponent;
  let fixture: ComponentFixture<MyListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
