import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CampaignService } from './campaign.service';

@Injectable({
    providedIn: 'root'
})
export class CampaignIdGuard implements CanActivate, OnInit {

    constructor(
        private campaignService: CampaignService,
        private router: Router
    ) {}
    ngOnInit() {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

        const campaignCount = this.campaignService.getCampaigns().length;
        const campaignId = +route.paramMap.get('campaign_id');

        if ((campaignId < campaignCount) && campaignId != null) {
            return true;
        }
        this.router.navigate(['/campaigns']);
        return false;
    }
}
