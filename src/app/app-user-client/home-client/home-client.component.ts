import { Component, OnInit } from '@angular/core';

import { DevServiceService } from 'src/app/providers/dev-service.service';

import { PATH } from 'src/app/utils/enums/pathRequest.enum';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {

  news = [1,2,3,4,5];

  sucursales:any = [];
  products:any = [];

  constructor(private devService:DevServiceService) { }

  ngOnInit() {
    this.getSucursales();
    this.getProducts();
  } 

  getSucursales(){
    this.devService.request(PATH.SUCURSALES)
      .subscribe(
        res => {
          this.sucursales = res;
        },
        err => console.error(err)
      );
  }

  getProducts(){
    this.devService.request(PATH.PRODUCTOS)
      .subscribe(
        res => {
          this.products = res;
        },
        err => console.error(err)
      );
  }
}
