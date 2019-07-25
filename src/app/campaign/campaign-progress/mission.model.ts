import { CampaignType } from '../campaign.model';

export class Mission {
    constructor(
        public name: string,
        public completed: boolean = false,
        public experience: number = 0
    ) {}
}

export class MissionFactory {
    public static createMissions(campaignType: CampaignType) {

        switch (campaignType) {
            case CampaignType.nightofzealot:
                return [
                    new Mission('The Gathering'),
                    new Mission('The Midnight Masks'),
                    new Mission('The Devourer Below'),
                ];
            case CampaignType.dunwich:
                return [
                    new Mission('Extracurricular Activity'),
                    new Mission('The House Always Wins'),
                    new Mission('The Miskatonic Museum'),
                    new Mission('The Essex County Express'),
                    new Mission('Blood on the Altar'),
                    new Mission('Undimensioned and Unseen'),
                    new Mission('Where Doom Awaits'),
                    new Mission('Lost in Time and Space')
                ];
        }
    }
}
