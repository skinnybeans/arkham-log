import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Mission } from './mission.model';
import { notEqual, notStrictEqual } from 'assert';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css']
})
export class CampaignProgressComponent implements OnInit {

  note = '';

  // Going to need something for campaign specific notes
  notes: string[] = ['some note about the campaign so far...', 'and another note'];
  missions: Mission[] = [
    {name: 'mission 2', completed: false, experience: 0, sequence: 2},
    {name: 'mission 1', completed: true, experience: 0, sequence: 1},
    {name: 'mission 3', completed: false, experience: 0, sequence: 3},
  ];


  constructor() {
    // Sort the mission array here for now, will need to move later
    this.missions.sort((a: Mission, b: Mission) => {
      return a.sequence - b.sequence;
    });
   }

  ngOnInit() {
  }

  onAddNote() {
    this.notes.push(this.note);
    this.note = '';
  }

  onRemoveNote(index: number) {
    this.notes.splice(index, 1);
  }
}
