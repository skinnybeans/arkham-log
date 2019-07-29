import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ZealotProgress } from './zealot-progress.model';
import { CampaignService } from '../../campaign.service';
import { Campaign, CampaignType } from '../../campaign.model';

@Injectable({
    providedIn: 'root'
})
export class ZealotProgressService {
    private campaignId: string;
    private campaign: Campaign;
    private cultists: ZealotProgress = null;

    interrogatedChanged = new Subject();
    escapedChanged = new Subject();

    constructor(
        private campaignService: CampaignService
    ) {
        // subscribe to the campaign service to see if the campaign changes at all
        this.campaignService.campaignsChanged.subscribe(
            _ => {
                if (this.campaignId) {
                    this.campaign = this.campaignService.getCampaign(this.campaignId);

                    if (this.campaign.campaignType !== CampaignType.nightofzealot) {
                        return;
                    }

                    // cater for campaigns that don't have progress added yet
                    if (!this.campaign.progress.other) {
                        this.campaign.progress.other = new ZealotProgress();
                    }

                    this.cultists = (this.campaign.progress.other as ZealotProgress);

                    this.interrogatedChanged.next(this.cultists.interrogated.slice());
                    this.escapedChanged.next(this.cultists.escaped.slice());
                }
            }
        );
    }

    setCampaignId(id: string) {
        if (this.campaignId !== id) {
            this.campaignId = id;
            this.campaign = this.campaignService.getCampaign(this.campaignId);

            if (this.campaign && this.campaign.campaignType === CampaignType.nightofzealot) {
                this.cultists = (this.campaign.progress.other as ZealotProgress);

                this.interrogatedChanged.next(this.cultists.interrogated.slice());
                this.escapedChanged.next(this.cultists.escaped.slice());
            }
        }
    }

    getInterrogatedCultists() {
        return this.cultists ? this.cultists.interrogated.slice() : [];
    }

    getEscapedCultists() {
        return this.cultists ? this.cultists.escaped.slice() : [];
    }

    addInterrogatedCultist(name: string) {
        this.cultists.interrogated.push(name);
        this.campaign.progress.other = this.cultists;
        this.campaignService.updateCampaign(this.campaign);
        // this.interrogatedChanged.next(this.cultists.interrogated.slice());
    }

    removeInterrogatedCultist(id: number) {
        this.cultists.interrogated.splice(id, 1);
        this.campaign.progress.other = this.cultists;
        this.campaignService.updateCampaign(this.campaign);
        // this.interrogatedChanged.next(this.cultists.interrogated.slice());
    }

    addEscapedCultist(name: string) {
        this.cultists.escaped.push(name);
        this.campaign.progress.other = this.cultists;
        this.campaignService.updateCampaign(this.campaign);
        // this.escapedChanged.next(this.cultists.escaped.slice());
    }

    removeEscapedCultist(id: number) {
        this.cultists.escaped.splice(id, 1);
        this.campaign.progress.other = this.cultists;
        this.campaignService.updateCampaign(this.campaign);
        // this.escapedChanged.next(this.cultists.escaped.slice());
    }
}
