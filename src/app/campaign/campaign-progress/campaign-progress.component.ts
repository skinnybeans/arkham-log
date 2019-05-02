import { Component, OnInit } from '@angular/core';

import { Mission } from './mission.model';
import { CampaignProgressService } from './campaign-progress.service';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css'],
  providers: [CampaignProgressService]
})
export class CampaignProgressComponent implements OnInit {

  // Going to need something for campaign specific notes
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
}
