import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Campaign } from '../campaign.model';
import { CampaignService } from '../campaign.service';


@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit, OnDestroy {

  campaigns: Campaign [];
  campaignSub: Subscription;
  campaignForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaigns = this.campaignService.getCampaigns();

    this.campaignSub = this.campaignService.campaignsChanged.subscribe(
      (campaigns: Campaign[]) => {
        this.campaigns = campaigns;
      }
    );
  }

  ngOnDestroy() {
    this.campaignSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.campaignForm);
  }
}
