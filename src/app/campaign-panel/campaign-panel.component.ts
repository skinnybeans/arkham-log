import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-panel',
  templateUrl: './campaign-panel.component.html',
  styleUrls: ['./campaign-panel.component.css']
})
export class CampaignPanelComponent implements OnInit {

  campaignName: string;
  isInvestigatorsVisible = false;
  isProgressVisible = false;

  constructor() {
    this.campaignName = 'Night of the Zealot';
   }

  ngOnInit() {
  }

  onToggleInvestigators() {
    this.isInvestigatorsVisible = !this.isInvestigatorsVisible;
  }

  onToggleProgress() {
    this.isProgressVisible = !this.isProgressVisible;
  }
}