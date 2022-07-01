import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPersonViewComponent } from './request-person-view.component';

describe('RequestPersonViewComponent', () => {
  let component: RequestPersonViewComponent;
  let fixture: ComponentFixture<RequestPersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPersonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPersonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
