import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*********************
 * OTROS COMPONENTES *
 *********************/

import { ClientesPublicoComponent } from './clientes-publico.component';
import { ClientesSucursalesComponent } from 'src/app/clientes-sucursales/clientes-sucursales.component';


/**********
 * GUARDS *
 **********/

// import * as Guard from '../guards/guards.index';


const routes: Routes = [
  {
    path: 'public',
    component: ClientesPublicoComponent,
    // canActivate: [Guard.AuthGuardGuard]
    children:[
      // {
      //   path:'home',
      //   loadChildren:'./home/home.component#HomeModule'
      // },
      {
        path:'sucursales',
        loadChildren:'../clientes-sucursales/clientes-sucursales.module#ClientesSucursalesModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesPublicoRoutingModule { }
