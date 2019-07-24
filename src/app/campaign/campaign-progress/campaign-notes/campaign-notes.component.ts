import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CampaignProgressService } from '../campaign-progress.service';

@Component({
  selector: 'app-campaign-notes',
  templateUrl: './campaign-notes.component.html',
  styleUrls: ['./campaign-notes.component.css']
})
export class CampaignNotesComponent implements OnInit, OnDestroy {

  note = '';
  notes: string[] = [];
  notesSub: Subscription;

  constructor(private campaignProgressService: CampaignProgressService) { }

  ngOnInit() {
    // this.notes = this.campaignProgressService.getNotes();

    this.notesSub = this.campaignProgressService.notesChanged.subscribe(
      () => {
        this.notes = this.campaignProgressService.getNotes();
      }
    );
  }

  ngOnDestroy() {
    this.notesSub.unsubscribe();
  }

  onAddNote() {
    this.campaignProgressService.addNote(this.note);
    this.note = '';
  }

  onRemoveNote(index: number) {
    this.campaignProgressService.removeNote(index);
  }
}
