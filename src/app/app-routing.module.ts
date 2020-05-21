import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {IntroduceComponent} from './introduce/introduce.component';
import {RoomsComponent} from './rooms/rooms.component';


const routes: Routes = [{
  path: '', component: RoomsComponent,
},
  {path: 'login', component: IntroduceComponent},
  {
    path: 'chat/:room', component: ChatComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
