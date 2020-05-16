import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppUserClientComponent } from './app-user-client.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component'; 
// import { ConfiguracionSucursalComponent } from './configuracion-sucursal/configuracion-sucursal.component';
// import { ConfiguracionCategoriaComponent } from './configuracion-categoria/configuracion-categoria.component';
// import { ConfiguracionProductoComponent } from './configuracion-producto/configuracion-producto.component';
const routes: Routes = [
  {
    path:'app-user-client',
    component:AppUserClientComponent,
    children:[
      {
        path:'home-client',
        component:HomeClientComponent
      },
      // {
      //   path:'all/config/:id_sucursal',
      //   component:ConfiguracionSucursalComponent
      // },
      {
        path:'shopping-car',
        component:ShoppingCarComponent
      },
      // {
      //   path:'all/config/:id_sucursal/config/:id_categoria/config/:id_producto',
      //   component:ConfiguracionProductoComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppUserClientRoutingModule { }
