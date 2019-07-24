import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Investigator } from './investigator.model';
import { DataStorageService } from '../common/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvestigatorService {

  investigatorSub: Subscription = new Subscription();

  private investigators: Investigator[] = null;
  private campaignId: string = null; // stores which campaign to read investigators from

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  investigatorsChanged = new Subject<Investigator[]>();

  setCampaignId(id: string) {
    if (this.campaignId !== id) {
      this.campaignId = id;
      this.investigators = null;
    }
  }

  getInvestigators() {
    if (!this.investigators && this.campaignId) {
      this.investigatorSub.unsubscribe();
      this.investigatorSub = this.dataStorageService.loadInvestigators(this.campaignId).subscribe(
        (investigators: Investigator[]) => {
          this.investigators = investigators;
          this.investigatorsChanged.next(this.investigators.slice());
        }
      );
    } else {
      return this.investigators.slice();
    }
  }

  getInvestigator(id: string) {

    if (this.investigators) {
      return this.investigators.find(investigator => {
        return investigator.id === id ? true : false;
      });
    }

    return null;
  }

  updateMentalTrauma(investigatorId: string, modifier: number) {
    const investigator = this.getInvestigator(investigatorId);

    if (investigator) {
      investigator.mentalTrauma += modifier;
      if (investigator.mentalTrauma < 0) {
        investigator.mentalTrauma = 0;
      }
      this.dataStorageService.updateInvestigator(investigator);
    }
  }

  updatePhysicalTrauma(investigatorId: string, modifier: number) {
    const investigator = this.getInvestigator(investigatorId);

    if (investigator) {
      investigator.physicalTrauma += modifier;
      if (investigator.physicalTrauma < 0) {
        investigator.physicalTrauma = 0;
      }
      this.dataStorageService.updateInvestigator(investigator);
    }
  }

  removeNote(investigatorId: string, noteId: number) {
    const investigator = this.getInvestigator(investigatorId);
    investigator.notes.splice(noteId, 1);
    this.dataStorageService.updateInvestigator(investigator);
  }

  addNote(investigatorId: string, newNote: string) {
    console.log(investigatorId);
    const investigator = this.getInvestigator(investigatorId);
    investigator.notes.push(newNote);
    this.dataStorageService.updateInvestigator(investigator);
  }

  deleteInvestigator(investigatorId: string) {
    this.dataStorageService.deleteInvestigator(investigatorId);
  }

  addInvestigator() {
    this.dataStorageService.createInvestigator(new Investigator('new investigator'));
  }

  updateInvestigator(investigator: Investigator) {
    this.dataStorageService.updateInvestigator(investigator);
  }
}
