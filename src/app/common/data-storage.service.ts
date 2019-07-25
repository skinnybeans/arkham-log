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
import { Investigator } from '../investigator/investigator.model';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private campaignCollection: AngularFirestoreCollection;
    private investigatorCollection: AngularFirestoreCollection;
    constructor(
        private angularFirestore: AngularFirestore,
        private logService: LogService,
        private router: Router
    ) {
        this.campaignCollection = this.angularFirestore.collection('campaigns');
    }

    loadInvestigators(campaignId: string) {
        this.investigatorCollection = this.campaignCollection.doc(campaignId).collection('investigators');
        return (from(this.investigatorCollection.valueChanges({ idField: 'id' })) as Observable<Investigator[]>)
            .pipe(
                catchError(
                    error => {
                        console.log('error loading investigators');
                        return throwError(error);
                    }
                )
            );
    }

    updateInvestigator(investigator: Investigator) {
        const { id, ...things } = investigator;
        this.investigatorCollection.doc(id).set(this.convertObject(things), { merge: true });
    }

    createInvestigator(investigator: Investigator) {
        const { id, ...things } = investigator;
        this.investigatorCollection.add(this.convertObject(things));
    }

    deleteInvestigator(id: string) {
        this.investigatorCollection.doc(id).delete();
    }

    // Return all saved campaigns
    loadCampaigns(): Observable<Campaign[]> {
        return (from(this.campaignCollection.valueChanges({ idField: 'id' })) as Observable<Campaign[]>)
            .pipe(
                catchError(
                    (error) => {
                        const logError: LogError = {
                            level: LogLevel.error,
                            url: this.router.url,
                            action: `loadCampaigns`,
                            type: error.name,
                            code: error.code,
                            message: error.message,
                            stack: error.stack
                        };
                        this.logService.LogError(logError);
                        return throwError(error);
                    }
                ),
                tap( _ => {
                    const logEvent: LogEvent = {
                        level: LogLevel.info,
                        url: this.router.url,
                        action: `loadCampaigns`,
                        message: `Loaded campaigns from firebase`
                    };

                    this.logService.LogEvent(logEvent);
                })
            );
    }

    updateCampaign(campaign: Campaign) {
        const { id, ...things } = campaign;
        return from(this.campaignCollection.doc(id).set(this.convertObject(things), {merge: true}))
            .pipe(
                catchError(
                    (error) => {
                        const logError: LogError = {
                            level: LogLevel.error,
                            url: this.router.url,
                            action: `updateCampaign/${id}`,
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
                    const logEvent: LogEvent = {
                        level: LogLevel.info,
                        url: this.router.url,
                        action: `updateCampaign`,
                        message: `Updated campaign in firebase id: ${id}`
                    };

                    this.logService.LogEvent(logEvent);
                })
            );
    }

    createCampaign(campaign: Campaign) {
        // Don't save an ID, let firebase assign one
        const { id, ...things} = campaign;

        // Firebase needs the typescript objects to be destructured otherwise it sees it as a
        // custom type and can't save it
        things.progress = {...things.progress};
        return from(this.campaignCollection.add(this.convertObject(things)))
            .pipe(
                catchError(
                    (error) => {
                        const logError: LogError = {
                            level: LogLevel.error,
                            url: this.router.url,
                            action: `addCampaign`,
                            type: error.name,
                            code: error.code,
                            message: error.message,
                            stack: error.stack
                        };
                        this.logService.LogError(logError);
                        return throwError(error);
                    }
                ),
                tap(result => {
                    const logEvent: LogEvent = {
                        level: LogLevel.info,
                        url: this.router.url,
                        action: `addCampaign`,
                        message: `Added new campaign to firebase: ${result.path}`
                    };
                    this.logService.LogEvent(logEvent);
                })
            );
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

    // convert to a pure javascript object so firebase doesn't complain
    private convertObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
