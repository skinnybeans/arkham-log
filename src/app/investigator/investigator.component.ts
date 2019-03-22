import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit {

  investigatorName = 'Wendy Adams';
  physicalTrauma = 0;
  mentalTrauma = 0;
  notes = [];
  newNote = '';

  constructor() { }

  ngOnInit() {
  }

  updateMentalTrauma(modifier: number) {
    this.mentalTrauma += modifier;
    if (this.mentalTrauma < 0) {
      this.mentalTrauma = 0;
    }
  }

  updatePhysicalTrauma(modifier: number) {
    this.physicalTrauma += modifier;
    if (this.physicalTrauma < 0) {
      this.physicalTrauma = 0;
    }
  }

  removeNote(index: number) {
    this.notes.splice(index, 1);
  }

  addNote() {
    this.notes.push(this.newNote);
    this.newNote = '';
  }
}
