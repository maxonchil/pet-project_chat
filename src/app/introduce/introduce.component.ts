import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent implements OnInit {
  @ViewChild('name') userName: ElementRef;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit(): void {
  }

  connectToChat(): void {
    this.socketService.emit('new-user', this.userName.nativeElement.value);
    this.router.navigate(['chat']);
  }

}
