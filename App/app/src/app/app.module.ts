import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChooseContentComponent } from "./components/choose-content/choose-content.component";
import { IdeasGeneratorComponent } from "./components/ideas-generator/ideas-generator.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from "@angular/material/radio";
import { CommonModule } from "@angular/common";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    ChooseContentComponent,
    IdeasGeneratorComponent,
    CreatePostComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    CommonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: "primary" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
