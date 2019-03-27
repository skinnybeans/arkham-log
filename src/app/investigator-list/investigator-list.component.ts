import { Component, OnInit } from '@angular/core';

import { Investigator } from '../investigator/investigator.model';

@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit {

  // TODO: pass this data to the investigator component
  investigators: Investigator[] = [
    new Investigator('Wendy Adams', 0 , 1)
  ];
  constructor() { }

  ngOnInit() {
  }

}
