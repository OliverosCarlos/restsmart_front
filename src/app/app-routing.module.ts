import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPublicoComponent } from 'src/app/clientes-publico/clientes-publico.component' 
import { ClientesSucursalesComponent} from 'src/app/clientes-sucursales/clientes-sucursales.component';
import { ToolOrdersComponent } from 'src/app/tool-orders/tool-orders/tool-orders.component';
import { AppUserClientComponent } from 'src/app/app-user-client/app-user-client.component';

const routes: Routes = [
  {
    path:'public',
    component:ClientesPublicoComponent
  },
  {
    path: 'sucursales',
    component: ClientesSucursalesComponent
  },
  {
    path: 'tool-orders',
    component: ToolOrdersComponent
  },
  {
    path: 'app-user-client',
    component: AppUserClientComponent
  },
  { path: '', redirectTo: 'public', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
