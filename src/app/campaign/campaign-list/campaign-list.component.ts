import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Campaign, CampaignType } from '../campaign.model';
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

  campaignDoc: AngularFirestoreDocument<Campaign>;

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private angularFirestore: AngularFirestore) { }

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
    const campaignName: string = this.campaignForm.get('name').value;
    const campaignType: keyof typeof CampaignType = this.campaignForm.get('type').value;

    this.campaignService.addCampaign(new Campaign(CampaignType[campaignType], campaignName));
    this.campaignForm.reset();

    this.angularFirestore.collection('campaigns').add(this.campaigns[0]).then(
      res => {
        console.log('Saved');
      },
      reject => {
        console.log(`Didn't save`);
      }
    );
  }
}
