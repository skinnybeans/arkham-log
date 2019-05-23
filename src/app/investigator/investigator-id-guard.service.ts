import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

import { InvestigatorService } from '../investigator.service';

@Injectable({
    providedIn: 'root'
})
export class InvestigatorIdGuard implements OnInit, CanActivateChild {

    investigatorCount: number;

    constructor(
        private investigatorService: InvestigatorService,
        private router: Router) {}

    ngOnInit() {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

        this.investigatorCount = this.investigatorService.investigators.length;

        if (+childRoute.paramMap.get('investigator_id') < this.investigatorCount) {
            return true;
        }

        this.router.navigate(['/campaigns']);
        return false;
    }
}
