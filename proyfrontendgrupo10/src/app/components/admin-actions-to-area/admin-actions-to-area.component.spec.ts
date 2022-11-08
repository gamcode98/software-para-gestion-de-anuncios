import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsToAreaComponent } from './admin-actions-to-area.component';

describe('AdminActionsToAreaComponent', () => {
  let component: AdminActionsToAreaComponent;
  let fixture: ComponentFixture<AdminActionsToAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActionsToAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionsToAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
