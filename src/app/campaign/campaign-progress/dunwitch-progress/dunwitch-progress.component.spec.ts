import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DunwitchProgressComponent } from './dunwitch-progress.component';

describe('DunwitchProgressComponent', () => {
  let component: DunwitchProgressComponent;
  let fixture: ComponentFixture<DunwitchProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DunwitchProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DunwitchProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
