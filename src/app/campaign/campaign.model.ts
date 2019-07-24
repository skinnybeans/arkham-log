import { Mission } from './campaign-progress/mission.model';

export enum CampaignType {
    nightofzealot = 'Night of the Zealot',
    dunwich = 'Dunwich Legacy',
}

export class CampaignProgress {
    notes: string [] = ['test note'];
    missions: Mission[];
    other: any; // store any campaign specific data
}

export class Campaign {

    public progress: CampaignProgress = new CampaignProgress();

    constructor(
        public campaignType: CampaignType,
        public name: string,
        public id?: string) {
    }
}
