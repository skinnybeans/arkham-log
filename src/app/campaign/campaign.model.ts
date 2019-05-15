export enum CampaignType {
    NightOfZealot = 'Night of the Zealot',
    Dunwitch = 'Dunwitch Legacy',
}

export class Campaign {
    public name: string;
    public campaignType: CampaignType;

    constructor(campaignType: CampaignType, name: string) {
        this.campaignType = campaignType;
        this.name = name;
    }
}
