import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Investigator } from './investigator.model';
import { InvestigatorService } from '../investigator.service';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit {

  investigator: Investigator;
  investigatorId: number;

  newNote = '';

  constructor(
    private investigatorService: InvestigatorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.investigatorId = +this.route.snapshot.paramMap.get('id');
    // this.investigator = this.investigatorService.investigators[this.investigatorId];

    this.route.params.subscribe(
      (params: Params) => {
        this.investigatorId = +params['id'];
        this.investigator = this.investigatorService.investigators[this.investigatorId];
      }
    );
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
    this.newNote = '';
  }
}
