import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../campaign.service';
import { Campaign } from '../campaign.model';

@Component({
  selector: 'app-campaign-panel',
  templateUrl: './campaign-panel.component.html',
  styleUrls: ['./campaign-panel.component.css']
})
export class CampaignPanelComponent implements OnInit {

  campaign: Campaign;
  campaignName: string;
  isInvestigatorsVisible = true;
  isProgressVisible = false;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.campaign = this.campaignService.getCampaign(+this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params: Params) => {
        this.campaign = this.campaignService.getCampaign(params['id']);
      }
    );
  }
}
