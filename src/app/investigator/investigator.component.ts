import { Component, OnInit, Input } from '@angular/core';
import { Investigator } from './investigator.model';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit {

  @Input() investigator: Investigator = new Investigator();

  newNote = '';

  constructor() { }

  ngOnInit() {
  }

  updateMentalTrauma(modifier: number) {
    this.investigator.mentalTrauma += modifier;
    if (this.investigator.mentalTrauma < 0) {
      this.investigator.mentalTrauma = 0;
    }
  }

  updatePhysicalTrauma(modifier: number) {
    this.investigator.physicalTrauma += modifier;
    if (this.investigator.physicalTrauma < 0) {
      this.investigator.physicalTrauma = 0;
    }
  }

  removeNote(index: number) {
    this.investigator.notes.splice(index, 1);
  }

  addNote() {
    this.investigator.notes.push(this.newNote);
    this.newNote = '';
  }
}
