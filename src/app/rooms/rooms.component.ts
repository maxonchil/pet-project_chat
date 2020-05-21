import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @ViewChild('room') newRoom: ElementRef;
  public rooms;

  constructor(private socketService: SocketService, private  router: Router) {
  }

  ngOnInit(): void {
    this.socketService.listen('new-room-created').subscribe(
      (data) => {
      const parsed = Object.entries(data).reduce((acc: any, room: any) => {
        const [name, value] = room;
        acc.push({name, users: value.users});
        return acc;
      }, []);
      return this.rooms.push(...parsed);
    });

    this.socketService.getRooms().subscribe((data) => {
        this.rooms = Object.entries(data.rooms).reduce((acc: any, room: any) => {
          const [name, props] = room;
          acc.push({name, users: props});
          return acc;
        }, []);
      }
    )
    ;
  }

  createRoom(): void {
    this.socketService.createRoom(this.newRoom.nativeElement.value);
  }

  goToChat(event, roomName: string): void {
    event.preventDefault();
    this.socketService.chatRoomName = roomName;
    this.router.navigate([`/login`]);
  }
}
