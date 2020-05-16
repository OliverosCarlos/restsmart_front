import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PATH } from 'src/app/utils/enums/pathRequest.enum';
import { DevServiceService } from 'src/app/providers/dev-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormIngredienteExtraModalComponent } from '../modals/form-ingrediente-extra-md/form-ingrediente-extra-md.component';
import { FormSinIngredienteModalComponent } from '../modals/form-sin-ingrediente-md/form-sin-ingrediente-md.component';
@Component({
  selector: 'app-configuracion-producto',
  templateUrl: './configuracion-producto.component.html',
  styleUrls: ['./configuracion-producto.component.scss']
})
export class ConfiguracionProductoComponent implements OnInit {
  bsModalRef: BsModalRef;

  ingredientesExtras:any = [];
  sinIngredientes:any = [];
  id_producto = '';
  id_sucursal = '';
  constructor( 
    private devService:DevServiceService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
    ) { 
      
    }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.id_producto = params.id_producto;
    this.id_sucursal = params.id_sucursal;
    this.getIngredientesExtrasByProducto();
    this.getSinIngredientesByProducto();
  }

  getIngredientesExtrasByProducto(){
    this.devService.requestBy(PATH.PRODUCTOS_INGREDIENTES_EXTRAS,this.id_producto)
      .subscribe(
        res => {
          this.ingredientesExtras = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  onConfigIngredienteExtra(){
    this.openModalConfigIngredienteExtra(
      'Configurar ingrediente extra',
      true,
      PATH.PRODUCTOS_INGREDIENTES_EXTRAS,
      {
        id_producto:this.id_producto,
        id_sucursal:this.id_sucursal
      }
    );
  }

  onEditConfigIngredienteExtra(data){
    this.openModalConfigIngredienteExtra('Editar ingrediente extra',false,PATH.PRODUCTOS_INGREDIENTES_EXTRAS,data);
  }

  // onDeleteConfigIngredienteExtra(id_categoria){
  //  try {
  //    this.devService.requestDelete(PATH.CATEGORIAS,id_categoria)
  //    .subscribe(
  //      res => {
  //        this.getIngredientesExtrasByProducto();
  //      },
  //      err => console.error(err)
  //    )
  //  } catch (error) {
  //    console.log(error);
  //  }
  // }

  getSinIngredientesByProducto(){
    this.devService.requestBy(PATH.PRODUCTOS_SIN_INGREDIENTES,this.id_producto)
      .subscribe(
        res => {
          this.sinIngredientes = res;
        },
        err => console.error(err)
      );
  }

  onConfigSinIngrediente(){
    this.openModalConfigSinIngrediente(
      'Configurar excepción',
      true,
      PATH.PRODUCTOS_SIN_INGREDIENTES,
      {
        id_producto:this.id_producto,
        id_sucursal:this.id_sucursal
      }
    );
  }

  onEditConfigSinIngrediente(data){
    this.openModalConfigSinIngrediente('Editar Configuración excepción',false,PATH.PRODUCTOS_SIN_INGREDIENTES,data);
  }

  // onDeleteIngrediente(id_categoria){
  //  try {
  //    this.devService.requestDelete(PATH.CATEGORIAS,id_categoria)
  //    .subscribe(
  //      res => {
  //        this.getIngredientesExtrasByProducto();
  //      },
  //      err => console.error(err)
  //    )
  //  } catch (error) {
  //    console.log(error);
  //  }
  // }


  private openModalConfigIngredienteExtra(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormIngredienteExtraModalComponent, {
      initialState: {
        title: title,
        create: create,
        requestPath: requestPath, // un simple string para dar con la ruta del back
        data: data
      },
      class: 'modal-lg',
      backdrop: 'static',
      ignoreBackdropClick: true
    });
    bsModalRef.content.action.subscribe(res => {
      this.getIngredientesExtrasByProducto();
    });
  }

  private openModalConfigSinIngrediente(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormSinIngredienteModalComponent, {
      initialState: {
        title: title,
        create: create,
        requestPath: requestPath, // un simple string para dar con la ruta del back
        data: data
      },
      class: 'modal-lg',
      backdrop: 'static',
      ignoreBackdropClick: true
    });
    bsModalRef.content.action.subscribe(res => {
      this.getSinIngredientesByProducto();
    });
  }


}
