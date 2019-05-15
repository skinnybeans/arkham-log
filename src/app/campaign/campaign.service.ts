import { Injectable, EventEmitter } from '@angular/core';

import { Campaign, CampaignType } from './campaign.model';

@Injectable({
    providedIn: 'root'
  })
export class CampaignService {
    private campaigns: Campaign[] = [
        { campaignType: CampaignType.NightOfZealot , name: 'my first zealot' },
        { campaignType: CampaignType.Dunwitch , name: 'another dunwitch' },
    ];

    campaignsChanged = new EventEmitter<Campaign[]>();

    getCampaign(id: number) {
        return this.campaigns[id];
    }

    getCampaigns() {
        return this.campaigns.slice();
    }

    addCampaign(campaign: Campaign) {
        this.campaigns.push(campaign);
        this.campaignsChanged.emit(this.campaigns.slice());
    }

    deleteCampaign(id: number) {
        this.campaigns.splice(id, 1);
        this.campaignsChanged.emit(this.campaigns.slice());
    }
}
