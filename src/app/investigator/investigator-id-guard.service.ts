import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { InvestigatorService } from '../investigator.service';

@Injectable({
    providedIn: 'root'
})
export class InvestigatorIdGuard implements CanActivateChild {

    constructor(
        private investigatorService: InvestigatorService,
        private router: Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

        const investigatorCount = this.investigatorService.investigators.length;

        if (+childRoute.paramMap.get('investigator_id') < investigatorCount) {
            return true;
        }

        this.router.navigate(['/campaigns']);
        return false;
    }
}
