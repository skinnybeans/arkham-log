import { Component, OnInit } from '@angular/core';
import { Campaign, CampaignType } from '../campaign.model';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns: Campaign[] = [
    { campaignType: CampaignType.NightOfZealot , name: 'my first zealot' },
    { campaignType: CampaignType.Dunwitch , name: 'another dunwitch' },
    ];

  constructor() { }

  ngOnInit() {
  }
}
