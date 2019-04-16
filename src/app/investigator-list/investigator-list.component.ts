import { Component, OnInit } from '@angular/core';

import { Investigator } from '../investigator/investigator.model';


@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit {

  investigators: Investigator[] = [
    new Investigator('Wendy Adams', 0 , 1, ['nothing of note here is a long note to test line wrapping']),
    new Investigator('Roland Banks', 1 , 1, ['relic of ages'])
  ];

  readonly maxInvestigators = 4;

  selectedInvestigator: Investigator;
  selectedIndex: number = undefined;

  constructor() { }

  ngOnInit() {
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
      this.investigators.splice(this.selectedIndex, 1);
      this.selectedInvestigator = undefined;
      this.selectedIndex = undefined;
    }
  }

  onAddInvestigator() {
    this.investigators.push(new Investigator('New Investigator'));
    this.selectedIndex = this.investigators.length - 1;
    this.selectedInvestigator = this.investigators[this.selectedIndex];
  }
}
