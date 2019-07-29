import { CampaignType } from '../campaign.model';
import { Mission } from '../campaign-progress/mission.model';
import { ZealotProgress } from './zealot-progress/zealot-progress.model';
import { DunwichProgress } from './dunwich-progress/dunwich-progress.model';

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

export class OtherProgressFactory {
    public static createOtherProgress(campaignType: CampaignType) {
        switch (campaignType) {
            case CampaignType.nightofzealot:
                return new ZealotProgress();
            case CampaignType.dunwich:
                return new DunwichProgress();
        }
    }
}
