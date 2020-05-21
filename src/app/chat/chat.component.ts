import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('message') newMessage: ElementRef;
  public messages;
  public chatRoom;

  constructor(private socketService: SocketService) {
    this.messages = [{message: 'You connected'}];
  }

  ngOnInit(): void {
    this.chatRoom = this.socketService.chatRoomName;
    this.socketService.listen('chat-message').subscribe((message) => this.messages.push(message));
    this.socketService.listen('user-connected').subscribe((message) => this.messages.push(message));
    this.socketService.listen('user-disconnected').subscribe((message) => this.messages.push(message));
  }

  sendMessage(): void {
    const message = this.newMessage.nativeElement.value;
    this.messages.push({name: 'You', message: this.newMessage.nativeElement.value});
    this.socketService.emit('new-chat-message', message, this.chatRoom);
  }


}
