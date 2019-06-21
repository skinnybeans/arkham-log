import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignPanelComponent } from './campaign/campaign-panel/campaign-panel.component';
import { InvestigatorListComponent } from './investigator-list/investigator-list.component';
import { CampaignProgressComponent } from './campaign/campaign-progress/campaign-progress.component';
import { InvestigatorComponent } from './investigator/investigator.component';
import { InvestigatorIdGuard } from './investigator/investigator-id-guard.service';
import { CampaignIdGuard } from './campaign/campaign-id-guard.service';
import { InvestigatorStartComponent } from './investigator/investigator-start/investigator-start.component';


const appRoutes: Routes = [
    { path: 'campaigns', component: CampaignListComponent },
    { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
    { path: 'campaign/:campaign_id',
        component: CampaignPanelComponent,
        canActivate: [CampaignIdGuard],
        children: [
            { path: 'investigators',
                component: InvestigatorListComponent,
                children: [
                    { path: '', component: InvestigatorStartComponent, pathMatch: 'full' },
                    { path: ':investigator_id', component: InvestigatorComponent, canActivate: [InvestigatorIdGuard]}
                ]
            },
            { path: 'progress', component: CampaignProgressComponent}
        ]
    },
    { path: '**', redirectTo: '/campaigns' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
