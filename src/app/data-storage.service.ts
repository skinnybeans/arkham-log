import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import {
    AngularFirestore, AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Campaign } from './campaign/campaign.model';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private campaignCollection: AngularFirestoreCollection;
    constructor(
        private angularFirestore: AngularFirestore
    )
    {
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
        return from(this.campaignCollection.doc(id).delete());
    }
}
