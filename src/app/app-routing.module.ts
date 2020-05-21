import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {IntroduceComponent} from './introduce/introduce.component';


const routes: Routes = [{
  path: '', component: IntroduceComponent,
},
  {
    path: 'chat', component: ChatComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
