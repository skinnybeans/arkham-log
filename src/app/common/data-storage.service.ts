import { Injectable } from '@angular/core';
import { from, throwError, Observable } from 'rxjs';

import {
    AngularFirestore, AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Campaign } from '../campaign/campaign.model';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from './log.service';
import { Router } from '@angular/router';
import { LogError, LogLevel, LogEvent } from './log.model';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private campaignCollection: AngularFirestoreCollection;
    constructor(
        private angularFirestore: AngularFirestore,
        private logService: LogService,
        private router: Router
    ) {
        this.campaignCollection = this.angularFirestore.collection('campaigns');
    }

    // Return all saved campaigns
    loadCampaigns(): Observable<Campaign[]> {
        return (from(this.campaignCollection.valueChanges({ idField: 'id' })) as Observable<Campaign[]>);
    }

    updateCampaign(campaign: Campaign) {
        const { id, ...things } = campaign;
        return from(this.campaignCollection.doc(id).set(things, {merge: true}));
    }

    createCampaign(campaign: Campaign) {
        const { id, ...things} = campaign;
        return from(this.campaignCollection.add(things));
    }

    deleteCampaign(id: string) {
        return from(this.campaignCollection.doc(id).delete()).pipe(
            catchError(
                (error) => {
                    const logError: LogError = {
                        level: LogLevel.error,
                        url: this.router.url,
                        action: `deleteCampaign/${id}`,
                        type: error.name,
                        code: error.code,
                        message: error.message,
                        stack: error.stack
                    };
                    this.logService.LogError(logError);
                    return throwError(error);
                }
            ),
            tap(_ => {
                console.log('delete success');
                const logEvent: LogEvent = {
                    level: LogLevel.info,
                    url: this.router.url,
                    action: `deleteCampaign/${id}`,
                    message: `Deleting campaign with id: ${id}`
                };

                this.logService.LogEvent(logEvent);
            })
        );
    }
}
