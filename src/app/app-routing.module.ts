import { Routes, RouterModule } from '@angular/router';

import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignPanelComponent } from './campaign/campaign-panel/campaign-panel.component';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
    { path: '', component: CampaignListComponent },
    { path: 'campaign', component: CampaignListComponent },
    { path: 'campaign/:id', component: CampaignPanelComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
