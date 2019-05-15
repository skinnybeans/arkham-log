import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignPanelComponent } from './campaign/campaign-panel/campaign-panel.component';
import { InvestigatorListComponent } from './investigator-list/investigator-list.component';
import { CampaignProgressComponent } from './campaign/campaign-progress/campaign-progress.component';


const appRoutes: Routes = [
    { path: 'campaigns', component: CampaignListComponent },
    { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
    { path: 'campaign/:id', component: CampaignPanelComponent, children: [
        {path: 'investigators', component: InvestigatorListComponent},
        {path: 'progress', component: CampaignProgressComponent}
    ]},
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