import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../campaign.service';
import { Campaign } from '../campaign.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaign-panel',
  templateUrl: './campaign-panel.component.html',
  styleUrls: ['./campaign-panel.component.css'],
})
export class CampaignPanelComponent implements OnInit {

  campaign: Campaign;
  campaignId: string;
  campaignSub: Subscription;
  loadingCampaign = true;
  isInvestigatorsVisible = true;
  isProgressVisible = false;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.campaignId = params.get('campaign_id');
        this.campaign = this.campaignService.getCampaign(this.campaignId);
        this.campaign ? this.loadingCampaign = false : this.loadingCampaign = true;
      }
    );

    this.campaignSub = this.campaignService.campaignsChanged.subscribe(
      _ => {
        this.campaign = this.campaignService.getCampaign(this.campaignId);
        this.campaign ? this.loadingCampaign = false : this.loadingCampaign = true;
      }
    );
  }
}
