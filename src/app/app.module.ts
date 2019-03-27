import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvestigatorComponent } from './investigator/investigator.component';
import { InvestigatorListComponent } from './investigator-list/investigator-list.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestigatorComponent,
    InvestigatorListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
