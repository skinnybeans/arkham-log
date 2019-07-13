import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { InvestigatorComponent } from './investigator/investigator.component';
import { InvestigatorListComponent } from './investigator-list/investigator-list.component';
import { CampaignPanelComponent } from './campaign/campaign-panel/campaign-panel.component';
import { CampaignProgressComponent } from './campaign/campaign-progress/campaign-progress.component';
import { CampaignNotesComponent } from './campaign/campaign-progress/campaign-notes/campaign-notes.component';
import { MissionsComponent } from './campaign/campaign-progress/missions/missions.component';
import { ZealotProgressComponent } from './campaign/campaign-progress/zealot-progress/zealot-progress.component';
import { HeaderComponent } from './header/header.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { AppRoutingModule } from './app-routing.module';
import { InvestigatorStartComponent } from './investigator/investigator-start/investigator-start.component';
import { DunwitchProgressComponent } from './campaign/campaign-progress/dunwitch-progress/dunwitch-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestigatorComponent,
    InvestigatorListComponent,
    CampaignPanelComponent,
    CampaignProgressComponent,
    CampaignNotesComponent,
    MissionsComponent,
    ZealotProgressComponent,
    HeaderComponent,
    CampaignListComponent,
    InvestigatorStartComponent,
    DunwitchProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
