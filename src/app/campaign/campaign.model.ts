export enum CampaignType {
    nightofzealot = 'Night of the Zealot',
    dunwitch = 'Dunwitch Legacy',
}

export class Campaign {
    public name: string;
    public campaignType: CampaignType;

    constructor(campaignType: CampaignType, name: string) {
        this.campaignType = campaignType;
        this.name = name;
    }
}
