import { Component, OnInit } from '@angular/core';

import { SocketioService } from 'src/app/providers/socketService/socketio.service';

@Component({
  selector: 'app-tool-orders',
  templateUrl: './tool-orders.component.html',
  styleUrls: ['./tool-orders.component.scss']
})
export class ToolOrdersComponent implements OnInit {

  products = [
    {name_product:'tostadas'},
    {name_product:'tostadas'},
    {name_product:'tostadas'},
    {name_product:'tostadas'},
    {name_product:'tostadas'}
  ]
  constructor(private socketService: SocketioService) { }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  sendMessage(){
    this.socketService.sendMessage();
  }



}
