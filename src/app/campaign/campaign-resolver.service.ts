import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Campaign } from './campaign.model';
import { CampaignService } from './campaign.service';


@Injectable({
    providedIn: 'root'
})
export class CampaignResolverService implements Resolve<Campaign[]> {

    constructor(private campaignService: CampaignService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Campaign[] | Observable<Campaign[]> | Promise<Campaign[]> {

        return this.campaignService.getCampaigns();
    }

}
