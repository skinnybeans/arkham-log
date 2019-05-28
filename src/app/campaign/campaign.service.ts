import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Campaign, CampaignType } from './campaign.model';

@Injectable({
    providedIn: 'root'
  })
export class CampaignService {
    private campaigns: Campaign[] = [
        { campaignType: CampaignType.NightOfZealot , name: 'my first zealot' },
        { campaignType: CampaignType.Dunwitch , name: 'another dunwitch' },
    ];

    campaignsChanged = new Subject<Campaign[]>();

    getCampaign(id: number) {
        return this.campaigns[id];
    }

    getCampaigns() {
        return this.campaigns.slice();
    }

    addCampaign(campaign: Campaign) {
        this.campaigns.push(campaign);
        this.campaignsChanged.next(this.campaigns.slice());
    }

    deleteCampaign(id: number) {
        this.campaigns.splice(id, 1);
        this.campaignsChanged.next(this.campaigns.slice());
    }
}
