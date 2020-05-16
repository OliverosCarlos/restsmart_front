import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesSucursalesComponent } from './clientes-sucursales.component';
import { AllSucursalesComponent } from './all-sucursales/all-sucursales.component';
import { ConfiguracionSucursalComponent } from './configuracion-sucursal/configuracion-sucursal.component';
import { ConfiguracionCategoriaComponent } from './configuracion-categoria/configuracion-categoria.component';
import { ConfiguracionProductoComponent } from './configuracion-producto/configuracion-producto.component';
const routes: Routes = [
  {
    path:'sucursales',
    component:ClientesSucursalesComponent,
    children:[
      {
        path:'all',
        component:AllSucursalesComponent
      },
      {
        path:'all/config/:id_sucursal',
        component:ConfiguracionSucursalComponent
      },
      {
        path:'all/config/:id_sucursal/config/:id_categoria',
        component:ConfiguracionCategoriaComponent
      },
      {
        path:'all/config/:id_sucursal/config/:id_categoria/config/:id_producto',
        component:ConfiguracionProductoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesSucursalesRoutingModule { }
