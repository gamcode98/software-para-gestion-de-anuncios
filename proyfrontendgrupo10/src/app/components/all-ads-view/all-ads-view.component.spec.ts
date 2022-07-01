import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdsViewComponent } from './all-ads-view.component';

describe('AllAdsViewComponent', () => {
  let component: AllAdsViewComponent;
  let fixture: ComponentFixture<AllAdsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
