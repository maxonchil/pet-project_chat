import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatChooseComponent} from './chat-choose/chat-choose.component';
import {ChatComponent} from './chat/chat.component';
import {HttpClientModule} from '@angular/common/http';
import { IntroduceComponent } from './introduce/introduce.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatChooseComponent,
    ChatComponent,
    IntroduceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
