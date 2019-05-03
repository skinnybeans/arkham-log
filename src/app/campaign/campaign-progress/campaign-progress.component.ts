import { Component, OnInit } from '@angular/core';

import { CampaignProgressService } from './campaign-progress.service';
import { ZealotProgressService } from './zealot-progress/zealot-progress.service';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css'],
  providers: [CampaignProgressService, ZealotProgressService]
})
export class CampaignProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
