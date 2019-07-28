import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Campaign } from './campaign.model';
import { CampaignService } from './campaign.service';
import { CampaignProgressService } from './campaign-progress/campaign-progress.service';


@Injectable({
    providedIn: 'root'
})
export class CampaignResolverService implements Resolve<Campaign[]> {

    constructor(
        private campaignService: CampaignService,
        private campaignProgressService: CampaignProgressService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Campaign[] | Observable<Campaign[]> | Promise<Campaign[]> {

        const campaignId = route.paramMap.get('campaign_id');
        this.campaignProgressService.setCampaignId(campaignId);
        return this.campaignService.getCampaigns();
    }

}
