import {
    Injectable,
    OnDestroy
} from '@angular/core';

import {
    Subject,
    Subscription,
} from 'rxjs';

import { tap, retry } from 'rxjs/operators';

import { Campaign } from './campaign.model';
import { DataStorageService } from '../data-storage.service';

@Injectable({
    providedIn: 'root'
  })
export class CampaignService implements OnDestroy {
    private campaigns: Campaign[];
    // private campaigns: Campaign[] = [
    //     { campaignType: CampaignType.nightofzealot , name: 'my first zealot' },
    //     { campaignType: CampaignType.dunwitch , name: 'another dunwitch' },
    // ];

    private campaignSub: Subscription;
    campaignsChanged = new Subject<Campaign[]>();

    constructor(
        private dataStorageService: DataStorageService
    ) {}

    ngOnDestroy() {
        if (this.campaignSub) {
            this.campaignSub.unsubscribe();
        }
    }

    getCampaign(id: number) {
        return this.campaigns[id];
    }

    getCampaigns() {
        if (!this.campaigns) {
            this.campaignSub = this.dataStorageService.loadCampaigns().subscribe(
                (campaigns: Campaign[]) => {
                    this.campaigns = campaigns;
                    this.campaignsChanged.next(this.campaigns.slice());
                }
            );
        } else {
            return this.campaigns.slice();
        }
    }

    addCampaign(campaign: Campaign) {
        return this.dataStorageService.createCampaign(campaign);
        // this.campaigns.push(campaign);
        // this.campaignsChanged.next(this.campaigns.slice());
    }

    deleteCampaign(id: string) {
        return this.dataStorageService.deleteCampaign(id)
        .pipe(
            tap(
                _ => {
                    console.log('tapped the delete success');
                },
                (error) => {
                    console.log('tapped the delete error');
                }),
        );
    }
}
