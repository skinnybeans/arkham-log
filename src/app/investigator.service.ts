import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Investigator } from './investigator/investigator.model';
import { DataStorageService } from './common/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvestigatorService {

  investigatorSub: Subscription = new Subscription();
  campaignId: string;

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  investigatorsChanged = new Subject<Investigator[]>();

  // investigators: Investigator[] = [
  //   new Investigator('Wendy Adams', 0 , 1, ['nothing of note here is a long note to test line wrapping']),
  //   new Investigator('Roland Banks', 1 , 1, ['relic of ages'])
  // ];

    private investigators: Investigator[];

  getInvestigators(campaignId: string) {
    if ((this.campaignId !== campaignId) || this.investigators === undefined) {
      this.campaignId = campaignId;
      this.investigatorSub.unsubscribe();
      this.investigatorSub = this.dataStorageService.loadInvestigators(campaignId).subscribe(
        (investigators: Investigator[]) => {
          this.investigators = investigators;
          console.log(investigators);
          this.investigatorsChanged.next(this.investigators.slice());
        }
      );
    } else {
      return this.investigators.slice();
    }
    //this.dataStorageService.loadInvestigators('076pZwvjR5R8MErmISOr');
  }

  getInvestigator(id: string) {
    if (!this.investigators) {
      this.getInvestigators(this.campaignId);
    }
    return this.investigators.find( investigator => {
      return investigator.id === id ? true : false;
    });
  }

  updateMentalTrauma(investigatorId: string, modifier: number) {
    const investigator = this.getInvestigator(investigatorId);

    if (investigator) {
      investigator.mentalTrauma += modifier;
      if (investigator.mentalTrauma < 0) {
        investigator.mentalTrauma = 0;
      }
    }
  }

  updatePhysicalTrauma(investigatorId: string, modifier: number) {
    const investigator = this.getInvestigator(investigatorId);

    if (investigator) {
      investigator.physicalTrauma += modifier;
      if (investigator.physicalTrauma < 0) {
        investigator.physicalTrauma = 0;
      }
    }
  }

  removeNote(investigatorId: string, noteId: number) {
    const investigator = this.getInvestigator(investigatorId);
    investigator.notes.splice(noteId, 1);
  }

  addNote(investigatorId: string, newNote: string) {
    const investigator = this.getInvestigator(investigatorId);
    investigator[investigatorId].notes.push(newNote);
  }

  deleteInvestigator(investigatorId: string) {
    //const investigator = this.getInvestigator(investigatorId);

    //this.investigators.splice(investigatorId, 1);
    //this.investigatorsChanged.next(this.investigators.slice());
  }

  addInvestigator() {
    this.investigators.push(new Investigator('New Investigator'));
    this.investigatorsChanged.next(this.investigators.slice());
  }
}
