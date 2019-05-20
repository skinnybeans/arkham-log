import { Component, OnInit } from '@angular/core';

import { Investigator } from '../investigator/investigator.model';
import { InvestigatorService } from '../investigator.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-investigator-list',
  templateUrl: './investigator-list.component.html',
  styleUrls: ['./investigator-list.component.css']
})
export class InvestigatorListComponent implements OnInit {

  investigators: Investigator[];

  readonly maxInvestigators = 4;

  // selectedInvestigator: Investigator;
  // selectedIndex: number = undefined;

  constructor(
    private investigatorService: InvestigatorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.investigators = this.investigatorService.investigators;
    this.investigatorService.investigatorsChanged.subscribe(
      (investigators: Investigator[]) => {
        this.investigators = investigators;
      }
    );
  }

  onAddInvestigator() {
    this.investigatorService.addInvestigator();
    const investigatorIndex = this.investigators.length - 1;
    this.router.navigate([investigatorIndex], { relativeTo: this.route });
  }
}
