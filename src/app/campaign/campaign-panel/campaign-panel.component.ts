import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../campaign.model';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {
    this.campaign = this.campaignService.getCampaign(+this.route.snapshot.url[this.route.snapshot.url.length - 1].path);
    this.campaignName = 'Night of the Zealot';
   }

  ngOnInit() {
  }

  onToggleInvestigators() {
    this.isInvestigatorsVisible = true;
    this.isProgressVisible = false;
  }

  onToggleProgress() {
    this.isProgressVisible = true;
    this.isInvestigatorsVisible = false;
  }
}
