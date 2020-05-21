import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat';

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.socketService.listen('test-event').subscribe((data) => console.log(data));
  }

  test(): void {
    this.socketService.emit('new-message', 'New message is coming');
  }
  sendMessage():void {

  }
}
