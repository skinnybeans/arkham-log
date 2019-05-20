import { Component, OnInit } from '@angular/core';

import { Investigator } from '../investigator/investigator.model';
import { InvestigatorService } from '../investigator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit {

  investigators: Investigator[];

  readonly maxInvestigators = 4;

  // selectedInvestigator: Investigator;
  // selectedIndex: number = undefined;

  constructor(
    private investigatorService: InvestigatorService) { }

  ngOnInit() {
    this.investigators = this.investigatorService.investigators;
    this.investigatorService.investigatorsChanged.subscribe(
      (investigators: Investigator[]) => {
        this.investigators = investigators;
      }
    );
  }

  // onDeleteInvestigator() {
  //   if (this.selectedIndex !== undefined) {
  //     this.investigatorService.deleteInvestigator(this.selectedIndex);
  //     this.selectedInvestigator = undefined;
  //     this.selectedIndex = undefined;
  //   }
  // }

  onAddInvestigator() {
    this.investigatorService.addInvestigator();
  }
}
