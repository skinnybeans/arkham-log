import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CampaignService } from '../campaign.service';
import { Campaign, CampaignType } from '../campaign.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css']
})
export class CampaignProgressComponent implements OnInit, OnDestroy {

  campaignId: string;
  campaign: Campaign;
  loadingCampaign = true;
  campaignSub: Subscription;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the selected campaign type
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        // this.campaignId = +this.route.parent.snapshot.paramMap.get('campaign_id');
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

  ngOnDestroy() {
    this.campaignSub.unsubscribe();
  }
}
