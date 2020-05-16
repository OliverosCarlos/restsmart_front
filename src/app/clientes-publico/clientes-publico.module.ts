import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesPublicoRoutingModule } from './clientes-publico-routing.module';
import { ClientesPublicoComponent } from './clientes-publico.component';

import { ClientesSucursalesModule } from '../clientes-sucursales/clientes-sucursales.module'; 
import { HomeModule } from './home/home.module';

import { NavigationComponent } from 'src/app/utils/navigation/navigation.component';


@NgModule({
  declarations: [
    ClientesPublicoComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    ClientesPublicoRoutingModule,
    ClientesSucursalesModule
  ]
})
export class ClientesPublicoModule { }
