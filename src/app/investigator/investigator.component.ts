import { Component, OnInit, Input } from '@angular/core';
import { Investigator } from './investigator.model';
import { InvestigatorService } from '../investigator.service';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit {

  @Input() investigator: Investigator = new Investigator();
  @Input() investigatorId: number;

  newNote = '';

  constructor(private investigatorService: InvestigatorService) { }

  ngOnInit() {
  }

  updateMentalTrauma(modifier: number) {
    this.investigatorService.updateMentalTrauma(this.investigatorId, modifier);
  }

  updatePhysicalTrauma(modifier: number) {
    this.investigatorService.updatePhysicalTrauma(this.investigatorId, modifier);
  }

  removeNote(index: number) {
    this.investigatorService.removeNote(this.investigatorId, index);
  }

  addNote() {
    this.investigatorService.addNote(this.investigatorId, this.newNote);
  }
}
