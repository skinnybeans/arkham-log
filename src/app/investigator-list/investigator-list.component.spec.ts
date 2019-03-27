import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatorListComponent } from './investigator-list.component';

describe('InvesigatorListComponent', () => {
  let component: InvestigatorListComponent;
  let fixture: ComponentFixture<InvestigatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
