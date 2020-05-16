import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modulos de terceros
import { AngularMaterialModule } from 'src/app/common-modules/angular-material.module'; 
import { BsModalService } from 'ngx-bootstrap/modal';

//modules components
import { AppUserClientRoutingModule } from './app-user-client-routing.module';

//components
import { AppUserClientComponent } from './app-user-client.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
// import { FormSucursalesComponent } from './form-sucursales/form-sucursales.component';
// import { AllSucursalesComponent } from './all-sucursales/all-sucursales.component';
// import { ConfiguracionSucursalComponent } from './configuracion-sucursal/configuracion-sucursal.component';
// import { ConfiguracionCategoriaComponent } from './configuracion-categoria/configuracion-categoria.component';
// import { ConfiguracionProductoComponent } from './configuracion-producto/configuracion-producto.component';

// modales
// import { FormSucursalModalComponent } from './modals/form-sucursal-md/form-sucursal-md.component';
// import { FormCategoriaModalComponent } from './modals/form-categoria-md/form-categoria-md.component';
// import { FormProductoModalComponent } from './modals/form-producto-md/form-producto-md.component'; 
// import { FormIngredienteModalComponent } from './modals/form-ingrediente-md/form-ingrediente-md.component';
// import { FormIngredienteExtraModalComponent } from './modals/form-ingrediente-extra-md/form-ingrediente-extra-md.component';
// import { FormSinIngredienteModalComponent } from './modals/form-sin-ingrediente-md/form-sin-ingrediente-md.component';

@NgModule({
  declarations: [
    AppUserClientComponent,
    HomeClientComponent,
    ShoppingCarComponent,
    // FormSucursalModalComponent,
    // FormCategoriaModalComponent,
    // FormProductoModalComponent,
    // FormIngredienteModalComponent,
    // FormIngredienteExtraModalComponent,
    // FormSinIngredienteModalComponent,
    // AllSucursalesComponent,
    // ConfiguracionSucursalComponent,
    // ConfiguracionCategoriaComponent,
    // ConfiguracionProductoComponent
  ],
  entryComponents:[
    // FormSucursalModalComponent,
    // FormCategoriaModalComponent,
    // FormProductoModalComponent,
    // FormIngredienteModalComponent,
    // FormIngredienteExtraModalComponent,
    // FormSinIngredienteModalComponent
  ],
  providers: [
    BsModalService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppUserClientRoutingModule,
    AngularMaterialModule
  ]
})
export class AppUserClientModule { }
