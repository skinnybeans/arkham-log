import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Subscription
} from 'rxjs';

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Campaign, CampaignType } from '../campaign.model';
import { CampaignService } from '../campaign.service';



@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit, OnDestroy {

  campaigns: Campaign [];
  campaignSubs: Subscription = new Subscription();
  campaignForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  });

  constructor(
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.campaigns = this.campaignService.getCampaigns();

    this.campaignSubs.add(this.campaignService.campaignsChanged.subscribe(
      (campaigns: Campaign[]) => {
        this.campaigns = campaigns;
      }
    ));
  }

  ngOnDestroy() {
    this.campaignSubs.unsubscribe();
  }

  onDelete(id: string) {
    this.campaignService.deleteCampaign(id);
  }

  onSubmit() {
    const campaignName: string = this.campaignForm.get('name').value;
    const campaignType: keyof typeof CampaignType = this.campaignForm.get('type').value;

    this.campaignSubs.add(
      this.campaignService.addCampaign(new Campaign(CampaignType[campaignType], campaignName)).subscribe(
        result => {
          console.log('finished adding campaign');
          console.log(result);
          this.campaignForm.reset();
        }
      )
    );
  }
}
