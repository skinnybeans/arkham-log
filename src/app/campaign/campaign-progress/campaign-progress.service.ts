import { Subject } from 'rxjs';

import { CampaignService } from '../campaign.service';
import { Campaign, CampaignProgress } from '../campaign.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CampaignProgressService {
    private campaignId: string = null;
    private campaign: Campaign = null;

    notesChanged = new Subject();
    missionsChanged = new Subject();

    constructor(
        private campaignService: CampaignService
    ) {
        // subscribe to the campaign service to see if the campaign changes at all
        this.campaignService.campaignsChanged.subscribe(
            _ => {
                if (this.campaignId) {
                    this.campaign = this.campaignService.getCampaign(this.campaignId);
                    // cater for campaigns that don't have progress added yet
                    if (!this.campaign.progress) {
                        this.campaign.progress = new CampaignProgress();
                    }

                    // could add logic here to check if the notes/missions have actually
                    // changed and not some other part of the campaign data.
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
        return this.campaign.progress.missions.slice();
    }

    updateMissionProgress(id: number, isCompleted: boolean) {
        this.campaign.progress.missions[id].completed = isCompleted;
        this.campaignService.updateCampaign(this.campaign);
    }

    updateMissionExperience(id: number, experience: number) {
        this.campaign.progress.missions[id].experience = experience;
        this.campaignService.updateCampaign(this.campaign);
    }
}
