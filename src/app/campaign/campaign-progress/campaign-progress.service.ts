import { Subject } from 'rxjs';

import { Mission } from './mission.model';
import { CampaignService } from '../campaign.service';
import { Campaign, CampaignProgress } from '../campaign.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CampaignProgressService {
    private campaignId: string = null;
    private campaign: Campaign = null;

    notesChanged = new Subject();  // trigger event when the notes are changed.

    // private notes: string[] = ['some note about the campaign so far...', 'and another note'];
    private missions: Mission[] = [
        {name: 'mission 2', completed: false, experience: 0, sequence: 2},
        {name: 'mission 1', completed: true, experience: 0, sequence: 1},
        {name: 'mission 3', completed: false, experience: 0, sequence: 3},
    ];

    constructor(
        private campaignService: CampaignService
    ) {
        // Sort the mission array here for now, will need to move later
        // this.missions.sort((a: Mission, b: Mission) => {
        //     return a.sequence - b.sequence;
        // });

        // subscribe to the campaign service to see if the campaign changes at all
        this.campaignService.campaignsChanged.subscribe(
            _ => {
                if (this.campaignId) {
                    this.campaign = this.campaignService.getCampaign(this.campaignId);
                    // cater for campaigns that don't have progress added yet
                    if (!this.campaign.progress) {
                        this.campaign.progress = new CampaignProgress();
                    }
                    this.notesChanged.next(this.campaign.progress.notes.slice());
                }
            }
        );
    }

    setCampaignId(id: string) {
        if (this.campaignId !== id) {
            this.campaignId = id;
            this.campaign = this.campaignService.getCampaign(this.campaignId);
        }
    }

    getNotes() {
        return this.campaign.progress.notes ? this.campaign.progress.notes.slice() : [];
    }

    addNote(note: string) {
        this.campaign.progress.notes.push(note);
        this.campaignService.updateCampaign(this.campaign);
    }

    removeNote(id: number) {
        this.campaign.progress.notes.splice(id, 1);
        this.campaignService.updateCampaign(this.campaign);
    }

    getMissions() {
        return this.missions.slice();
    }

    updateMissionProgress(id: number, isCompleted: boolean) {
        this.missions[id].completed = isCompleted;
    }

    updateMissionExperience(id: number, experience: number) {
        this.missions[id].experience = experience;
    }
}
