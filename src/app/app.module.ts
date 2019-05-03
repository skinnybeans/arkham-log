import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvestigatorComponent } from './investigator/investigator.component';
import { InvestigatorListComponent } from './investigator-list/investigator-list.component';
import { CampaignPanelComponent } from './campaign/campaign-panel/campaign-panel.component';
import { CampaignProgressComponent } from './campaign/campaign-progress/campaign-progress.component';
import { CampaignNotesComponent } from './campaign/campaign-progress/campaign-notes/campaign-notes.component';
import { MissionsComponent } from './campaign/campaign-progress/missions/missions.component';
import { ZealotProgressComponent } from './campaign/campaign-progress/zealot-progress/zealot-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestigatorComponent,
    InvestigatorListComponent,
    CampaignPanelComponent,
    CampaignProgressComponent,
    CampaignNotesComponent,
    MissionsComponent,
    ZealotProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
