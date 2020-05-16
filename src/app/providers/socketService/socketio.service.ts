import { Injectable } from '@angular/core';
import * as io  from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('connect', function(){
      console.log('server connected');
    });

    this.socket.on('disconnect', function(){
      console.log('server disconnect');
    });

    this.socket.on('my message', function(msg){
      console.log('server say: '+ msg);
    })

  }

  sendMessage(){
    this.socket.emit('my message', 'Hello there from Angular.');
  }
}
