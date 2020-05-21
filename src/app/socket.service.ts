import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any;
  public chatRoomName: string;
  readonly url = 'ws://localhost:3000';


  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data1: string, data2: string) {
    this.socket.emit(eventName, data1, data2);
  }

  getRooms(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/rooms');
  }

  public createRoom(name: string): void {
    this.http.post('http://localhost:3000/rooms', {name}).subscribe();
  }
}
