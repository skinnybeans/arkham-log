export enum CampaignType {
    nightofzealot = 'Night of the Zealot',
    dunwitch = 'Dunwitch Legacy',
}

export class Campaign {

    constructor(
        public campaignType: CampaignType,
        public name: string,
        public id?: string) {
    }
}
