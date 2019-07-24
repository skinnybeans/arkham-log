export enum CampaignType {
    nightofzealot = 'Night of the Zealot',
    dunwich = 'Dunwich Legacy',
}

export class Campaign {

    constructor(
        public campaignType: CampaignType,
        public name: string,
        public id?: string) {
    }
}
