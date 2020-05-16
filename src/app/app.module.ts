import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//SERVICES
import { SocketioService } from 'src/app/providers/socketService/socketio.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientesPublicoModule } from './clientes-publico/clientes-publico.module';
import { ClientesSucursalesModule } from './clientes-sucursales/clientes-sucursales.module';
import { AppUserClientModule } from './app-user-client/app-user-client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToolOrdersComponent } from './tool-orders/tool-orders/tool-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientesPublicoModule,
    ClientesSucursalesModule,
    AppUserClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
