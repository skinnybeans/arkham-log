import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CampaignProgressService } from './campaign-progress.service';
import { ZealotProgressService } from './zealot-progress/zealot-progress.service';
import { CampaignService } from '../campaign.service';
import { Campaign, CampaignType } from '../campaign.model';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css'],
  providers: [CampaignProgressService, ZealotProgressService]
})
export class CampaignProgressComponent implements OnInit {

  campaignId: number;
  campaign: Campaign;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the selected campaign type
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        // this.campaignId = +this.route.parent.snapshot.paramMap.get('campaign_id');
        this.campaignId = +params.get('campaign_id');
        this.campaign = this.campaignService.getCampaign(this.campaignId);
      }
    );
  }
}
