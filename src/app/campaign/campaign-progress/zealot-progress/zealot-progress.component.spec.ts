import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealotProgressComponent } from './zealot-progress.component';

describe('ZealotProgressComponent', () => {
  let component: ZealotProgressComponent;
  let fixture: ComponentFixture<ZealotProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealotProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealotProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
