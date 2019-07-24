import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DunwichProgressComponent } from './dunwich-progress.component';

describe('DunwichProgressComponent', () => {
  let component: DunwichProgressComponent;
  let fixture: ComponentFixture<DunwichProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DunwichProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DunwichProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
