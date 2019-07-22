import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { Subscription } from 'rxjs';

import { Investigator } from '../investigator/investigator.model';
import { InvestigatorService } from '../investigator.service';


@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit, OnDestroy {

  investigators: Investigator[];
  investigatorSub: Subscription;

  readonly maxInvestigators = 4;

  // selectedInvestigator: Investigator;
  // selectedIndex: number = undefined;

  constructor(
    private investigatorService: InvestigatorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.investigators = this.investigatorService.getInvestigators(this.route.snapshot.paramMap.get('campaign_id'));
    this.investigatorSub = this.investigatorService.investigatorsChanged.subscribe(
      (investigators: Investigator[]) => {
        this.investigators = investigators;
      }
    );
  }

  ngOnDestroy() {
    this.investigatorSub.unsubscribe();
  }

  onAddInvestigator() {
    this.investigatorService.addInvestigator();
    // const investigatorIndex = this.investigators.length - 1;
    // this.router.navigate([investigatorIndex], { relativeTo: this.route });
  }
}
