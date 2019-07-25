import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Investigator } from './investigator.model';
import { InvestigatorService } from './investigator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit, OnDestroy {

  investigator: Investigator;
  investigatorId: string;
  investigatorSub: Subscription;
  loadingInvestigator = true;

  newNote = '';

  constructor(
    private investigatorService: InvestigatorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // If the route changes make sure to load a new investigator
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.loadingInvestigator = true;
        this.investigatorId = params.get('investigator_id');
        this.investigator = this.investigatorService.getInvestigator(this.investigatorId);
        this.loadingInvestigator = this.investigator ? false : true;
      }
    );
    // If an investigators changed event fires, reload the investigator
    this.investigatorSub = this.investigatorService.investigatorsChanged.subscribe(
      _ => {
        this.investigator = this.investigatorService.getInvestigator(this.investigatorId);
        this.loadingInvestigator = false;
      }
    );
  }

  ngOnDestroy() {
    this.investigatorSub.unsubscribe();
  }

  updateMentalTrauma(modifier: number) {
    this.investigatorService.updateMentalTrauma(this.investigatorId, modifier);
  }

  updatePhysicalTrauma(modifier: number) {
    this.investigatorService.updatePhysicalTrauma(this.investigatorId, modifier);
  }

  removeNote(index: number) {
    this.investigatorService.removeNote(this.investigatorId, index);
  }

  addNote() {
    this.investigatorService.addNote(this.investigatorId, this.newNote);
    this.newNote = '';
  }

  onDelete() {
    this.investigatorService.deleteInvestigator(this.investigatorId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSaveName() {
    this.investigatorService.updateInvestigator(this.investigator);
  }
}
