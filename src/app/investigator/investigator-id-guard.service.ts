import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { InvestigatorService } from '../investigator.service';

@Injectable({
    providedIn: 'root'
})
export class InvestigatorIdGuard implements CanActivate {

    constructor(
        private investigatorService: InvestigatorService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

        const investigatorCount = this.investigatorService.investigators.length;

        if (+route.paramMap.get('investigator_id') < investigatorCount) {
            return true;
        }

        this.router.navigate(['/campaigns']);
        return false;
    }
}
