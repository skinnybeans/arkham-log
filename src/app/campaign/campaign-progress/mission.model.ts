import { CampaignType } from '../campaign.model';

export class Mission {
    constructor(
        public name: string,
        public completed: boolean = false,
        public experience: number = 0
    ) {}
}

