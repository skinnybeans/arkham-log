import { Component, OnInit } from '@angular/core';

import { Investigator } from '../investigator/investigator.model';
import { InvestigatorService } from '../investigator.service';


@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit {

  investigators: Investigator[];

  readonly maxInvestigators = 4;

  selectedInvestigator: Investigator;
  selectedIndex: number = undefined;

  constructor(private investigatorService: InvestigatorService) { }

  ngOnInit() {
    this.investigators = this.investigatorService.investigators;
  }

  onToggleInvestigator(id: number, event: any) {
    if (this.selectedInvestigator === this.investigators[id]) {
      this.selectedInvestigator = undefined;
      this.selectedIndex = undefined;
    } else {
      this.selectedInvestigator = this.investigators[id];
      this.selectedIndex = id;
    }
  }

  onDeleteInvestigator() {
    if (this.selectedIndex !== undefined) {
      this.investigatorService.deleteInvestigator(this.selectedIndex);
      this.selectedInvestigator = undefined;
      this.selectedIndex = undefined;
    }
  }

  onAddInvestigator() {
    this.investigatorService.addInvestigator();
    this.selectedIndex = this.investigators.length - 1;
    this.selectedInvestigator = this.investigators[this.selectedIndex];
  }
}
