import { Component, OnInit } from '@angular/core';

import { CampaignProgressService } from './campaign-progress.service';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css'],
  providers: [CampaignProgressService]
})
export class CampaignProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
