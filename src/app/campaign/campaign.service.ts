import {
    Injectable,
    OnDestroy
} from '@angular/core';

import {
    Subject,
    Subscription,
} from 'rxjs';


import { Campaign } from './campaign.model';
import { DataStorageService } from '../common/data-storage.service';
import { MissionFactory, OtherProgressFactory } from './campaign-progress/progress-factory';



@Injectable({
    providedIn: 'root'
  })
export class CampaignService implements OnDestroy {
    private campaigns: Campaign[];

    private campaignSub: Subscription;
    campaignsChanged = new Subject<Campaign[]>();

    constructor(
        private dataStorageService: DataStorageService,
    ) {}

    ngOnDestroy() {
        if (this.campaignSub) {
            this.campaignSub.unsubscribe();
        }
    }

    getCampaign(id: string) {
        if (this.campaigns) {
            return this.campaigns.find(campaign => {
                return campaign.id === id ? true : false;
            });
        }

        return null;
    }

    getCampaigns() {
        if (!this.campaigns) {
            this.campaignSub = this.dataStorageService.loadCampaigns().subscribe(
                (campaigns: Campaign[]) => {
                    this.campaigns = campaigns;
                    this.campaignsChanged.next(this.campaigns.slice());
                    return this.campaigns.slice();
                }
            );
        } else {
            return this.campaigns.slice();
        }
    }

    addCampaign(campaign: Campaign) {
        campaign.progress.missions = MissionFactory.createMissions(campaign.campaignType);
        campaign.progress.other = OtherProgressFactory.createOtherProgress(campaign.campaignType);
        return this.dataStorageService.createCampaign(campaign);
    }

    deleteCampaign(id: string) {
        return this.dataStorageService.deleteCampaign(id);
    }

    updateCampaign(campaign: Campaign) {
        return this.dataStorageService.updateCampaign(campaign);
    }
}
