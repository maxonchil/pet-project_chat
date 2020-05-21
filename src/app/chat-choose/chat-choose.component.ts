import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-chat-choose',
  templateUrl: './chat-choose.component.html',
  styleUrls: ['./chat-choose.component.scss']
})
export class ChatChooseComponent implements OnInit {
  @ViewChild('input') chatRoom: ElementRef;

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
  }


}
