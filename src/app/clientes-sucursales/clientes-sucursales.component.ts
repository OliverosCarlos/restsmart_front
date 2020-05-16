import { Component, OnInit, HostListener } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DevServiceService } from 'src/app/providers/dev-service.service';
import { FormSucursalModalComponent } from './modals/form-sucursal-md/form-sucursal-md.component';
@Component({
  selector: 'app-clientes-sucursales',
  templateUrl: './clientes-sucursales.component.html',
  styleUrls: ['./clientes-sucursales.component.scss']
})
export class ClientesSucursalesComponent implements OnInit {
  bigWindow: Boolean = false;
  smallWindow: Boolean = false;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 400) {//detectar el tamaño de la pantalla para editar la tabla
      this.bigWindow = false;
      this.smallWindow = true;
    }
    else{
     this.bigWindow = true;
     this.smallWindow = false;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 400) {//detectar el tamaño de la pantalla para editar la tabla
      this.bigWindow = false;
      this.smallWindow = true;
    }
    else{
      this.bigWindow = true; 
      this.smallWindow = false;
    }    
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }


  closeNav() {
    document.getElementById("mySidenav").style.width = "0"; 
  }

}
