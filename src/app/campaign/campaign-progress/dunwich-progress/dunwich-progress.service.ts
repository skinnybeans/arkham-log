import { Injectable } from '@angular/core';
import { CampaignService } from '../../campaign.service';
import { Campaign, CampaignType } from '../../campaign.model';
import { DunwichProgress } from './dunwich-progress.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DunwichProgressService {

    private campaignId: string;
    private campaign: Campaign;
    private dunwichProgress: DunwichProgress;
    public sacrificesChanged = new Subject<string[]>();

    constructor(
        private campaignService: CampaignService
    ) {
        // subscribe to the campaign service to see if the campaign changes at all
        this.campaignService.campaignsChanged.subscribe(
            _ => {
                if (this.campaignId) {
                    this.campaign = this.campaignService.getCampaign(this.campaignId);

                    if (this.campaign.campaignType !== CampaignType.dunwich) {
                        return;
                    }
                    // cater for campaigns that don't have progress added yet
                    if (!this.campaign.progress.other) {
                        this.campaign.progress.other = new DunwichProgress();
                    }

                    this.dunwichProgress = (this.campaign.progress.other as DunwichProgress);
                    this.sacrificesChanged.next(this.dunwichProgress.sacrificed.slice());
                }
            }
        );
    }

    setCampaignId(id: string) {
        if (this.campaignId !== id) {
            this.campaignId = id;
            this.campaign = this.campaignService.getCampaign(this.campaignId);

            if (this.campaign && this.campaign.campaignType === CampaignType.dunwich) {
                this.dunwichProgress = (this.campaign.progress.other as DunwichProgress);
                this.sacrificesChanged.next(this.dunwichProgress.sacrificed.slice());
            }
        }
    }

    getSacrificeList() {
        return this.dunwichProgress ? this.dunwichProgress.sacrificed : null;
    }

    addSacrifice(name: string) {
        this.dunwichProgress.sacrificed.push(name);
        this.campaign.progress.other = this.dunwichProgress;
        this.campaignService.updateCampaign(this.campaign);
    }

    removeSacrifice(id: number) {
        this.dunwichProgress.sacrificed.splice(id, 1);
        this.campaign.progress.other = this.dunwichProgress;
        this.campaignService.updateCampaign(this.campaign);
    }
}
