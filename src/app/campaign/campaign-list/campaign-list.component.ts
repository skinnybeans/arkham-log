import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Router } from '@angular/router';
import {
  Subscription,
  from} from 'rxjs';

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  AngularFirestoreModule
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

  // Testing the firestore
  campaignDoc: AngularFirestoreDocument<Campaign>;
  campaignCollection: AngularFirestoreCollection<Campaign>;

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

    this.angularFirestore.collection<Campaign>('campaigns').valueChanges({idField: '_id'}).subscribe(
      data => {
        console.log('Reading data');
        console.log(data);
      }
    );

    // writing data
    from(this.angularFirestore.collection<Campaign>('campaigns').doc('XMRoNhBQwIOHKTChTSeA').set({name: 'setting through app'}, {merge: true})).subscribe(
      res => {
        console.log('update success');
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('update finished');
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

    // Observable way
    from(this.angularFirestore.collection('campaigns').add(this.campaigns[0])).subscribe(
      result => {
        console.log('result');
        console.log(result);
      },
      error => {
        console.log('error');
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );

    // Promise way
    // this.angularFirestore.collection('campaigns').add(this.campaigns[0]).then(
    //   res => {
    //     console.log('Observe Saved');
    //     console.log(res);
    //   },
    //   reject => {
    //     console.log(`Observe Error`);
    //     console.log(reject);
    //   }
    // );
  }
}
