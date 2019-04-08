import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-progress',
  templateUrl: './campaign-progress.component.html',
  styleUrls: ['./campaign-progress.component.css']
})
export class CampaignProgressComponent implements OnInit {

  notes: string[] = ['some note about the campaign so far...'];
  constructor() { }

  ngOnInit() {
  }

}
