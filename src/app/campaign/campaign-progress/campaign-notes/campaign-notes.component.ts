import { Component, OnInit } from '@angular/core';

import { CampaignProgressService } from '../campaign-progress.service';

@Component({
  selector: 'app-campaign-notes',
  templateUrl: './campaign-notes.component.html',
  styleUrls: ['./campaign-notes.component.css']
})
export class CampaignNotesComponent implements OnInit {

  note = '';
  notes: string[] = [];

  constructor(private campaignProgressService: CampaignProgressService) { }

  ngOnInit() {
    this.notes = this.campaignProgressService.getNotes();

    this.campaignProgressService.notesChanged.subscribe(
      () => {
        this.notes = this.campaignProgressService.getNotes();
      }
    );
  }

  onAddNote() {
    this.campaignProgressService.addNote(this.note);
    this.note = '';
  }

  onRemoveNote(index: number) {
    this.campaignProgressService.removeNote(index);
  }
}
