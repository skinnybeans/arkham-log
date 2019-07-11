import {
    Injectable,
    OnDestroy
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
    Subject,
    Subscription,
    EMPTY,
    throwError,
} from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Campaign } from './campaign.model';
import { DataStorageService } from '../common/data-storage.service';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';

const SumoLogger = require('sumo-logger');

const opts = {
    endpoint: 'https://collectors.au.sumologic.com/receiver/v1/http/ZaVnC4dhaV1d433iVnVuph10fzy6acOKJYlmhV5cg_IejVVOwQa56kMcfxPDnnz3Y54epgiZkrL6w6WV_5xaz0vhpqY4Gx-k-paFSGZLm7f8QvKSna6qAA==',
    // ... any other options ...
};

// Instantiate the SumoLogger
const sumoLogger = new SumoLogger(opts);

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
        private dataStorageService: DataStorageService,
        private http: HttpClient,
        private route: Router
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
            catchError(
                (error) => {
                    sumoLogger.log(
                        { name: error.name, code: error.code, message: error.message, stack: error.stack },
                        {url: this.route.url});
                    return throwError(error);
                }
            )
        );
    }
}
