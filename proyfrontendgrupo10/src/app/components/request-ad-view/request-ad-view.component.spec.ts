import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdViewComponent } from './request-ad-view.component';

describe('RequestAdViewComponent', () => {
  let component: RequestAdViewComponent;
  let fixture: ComponentFixture<RequestAdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
