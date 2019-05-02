import { Component, OnInit } from '@angular/core';

import { Mission } from '../mission.model';
import { CampaignProgressService } from '../campaign-progress.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {

  missions: Mission[] = [];

  constructor(private campaignProgressService: CampaignProgressService) { }

  ngOnInit() {
    this.missions = this.campaignProgressService.getMissions();
  }

  onStatusChanged(id: number, event: MouseEvent) {
    this.campaignProgressService.updateMissionProgress(id, event.currentTarget.checked);
  }
}
