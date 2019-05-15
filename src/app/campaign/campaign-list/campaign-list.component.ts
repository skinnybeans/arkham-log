import { Component, OnInit } from '@angular/core';
import { Campaign, CampaignType } from '../campaign.model';
import { Router } from '@angular/router';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns: Campaign [];
  constructor(
    private router: Router,
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaigns = this.campaignService.getCampaigns();

    this.campaignService.campaignsChanged.subscribe(
      (campaigns: Campaign[]) => {
        this.campaigns = campaigns;
      }
    );
  }

  onShow(id: number) {
    this.router.navigate(['/campaign', id]);
  }
}
