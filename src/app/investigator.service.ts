import { Injectable } from '@angular/core';

import { Investigator } from './investigator/investigator.model';

@Injectable({
  providedIn: 'root'
})
export class InvestigatorService {

  constructor() { }

  investigators: Investigator[] = [
    new Investigator('Wendy Adams testing the wrapping of long names', 0 , 1, ['nothing of note here is a long note to test line wrapping']),
    new Investigator('Roland Banks', 1 , 1, ['relic of ages'])
  ];

  updateMentalTrauma(investigatorId: number, modifier: number) {
    this.investigators[investigatorId].mentalTrauma += modifier;
    if (this.investigators[investigatorId].mentalTrauma < 0) {
      this.investigators[investigatorId].mentalTrauma = 0;
    }
  }

  updatePhysicalTrauma(investigatorId: number, modifier: number) {
    this.investigators[investigatorId].physicalTrauma += modifier;
    if (this.investigators[investigatorId].physicalTrauma < 0) {
      this.investigators[investigatorId].physicalTrauma = 0;
    }
  }

  removeNote(investigatorId: number, noteId: number) {
    this.investigators[investigatorId].notes.splice(noteId, 1);
  }

  addNote(investigatorId: number, newNote: string) {
    this.investigators[investigatorId].notes.push(newNote);
  }

  deleteInvestigator(investigatorId: number) {
    this.investigators.splice(investigatorId, 1);
  }

  addInvestigator() {
    this.investigators.push(new Investigator('New Investigator'));
  }
}
