import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Campaign } from './campaign.model';
import { CampaignService } from './campaign.service';
import { CampaignProgressService } from './campaign-progress/campaign-progress.service';
import { ZealotProgressService } from './campaign-progress/zealot-progress/zealot-progress.service';
import { InvestigatorService } from '../investigator/investigator.service';
import { DunwichProgressService } from './campaign-progress/dunwich-progress/dunwich-progress.service';


@Injectable({
    providedIn: 'root'
})
export class CampaignResolverService implements Resolve<Campaign[]> {

    constructor(
        private campaignService: CampaignService,
        private campaignProgressService: CampaignProgressService,
        private zealotProgressService: ZealotProgressService,
        private investigatorService: InvestigatorService,
        private dunwichProgressService: DunwichProgressService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Campaign[] | Observable<Campaign[]> | Promise<Campaign[]> {

        const campaignId = route.paramMap.get('campaign_id');
        this.campaignProgressService.setCampaignId(campaignId);
        this.zealotProgressService.setCampaignId(campaignId);
        this.dunwichProgressService.setCampaignId(campaignId);
        this.investigatorService.setCampaignId(campaignId);

        console.log('campaign resolver triggered');

        return this.campaignService.getCampaigns();
    }

}
