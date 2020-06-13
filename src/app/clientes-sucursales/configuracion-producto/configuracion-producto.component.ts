import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ADMIN_PATH } from 'src/app/utils/enums/pathRequest.enum';
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

  ingredientsExtras:any = [];
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
    this.devService.requestBy(ADMIN_PATH.PRODUCTS_INGREDIENTS_EXTRAS+'/by-product',this.id_producto)
      .subscribe(
        res => {
          this.ingredientsExtras = res;
        },
        err => console.error(err)
      );
  }

  onConfigIngredienteExtra(){
    this.openModalConfigIngredienteExtra(
      'Configurar ingrediente extra',
      true,
      ADMIN_PATH.PRODUCTS_INGREDIENTS_EXTRAS,
      {
        id_producto:this.id_producto,
        id_sucursal:this.id_sucursal
      }
    );
  }

  onEditExtraIngredient(id_ingredient,price_ingredient){
    this.openModalConfigIngredienteExtra('Editar ingrediente extra',false,ADMIN_PATH.PRODUCTS_INGREDIENTS_EXTRAS,
    {
      id_product:this.id_producto,
      id_ingredient: id_ingredient,
      price_ingredient: price_ingredient
    });
  }

  onDeleteExtraIngredient(id_ingredient){
   try {
     this.devService.requestDeleteParams(ADMIN_PATH.PRODUCTS_INGREDIENTS_EXTRAS,this.id_producto,id_ingredient)
     .subscribe(
       res => {
         this.getIngredientesExtrasByProducto();
       },
       err => console.error(err)
     )
   } catch (error) {
     console.log(error);
   }
  }

  getSinIngredientesByProducto(){
    this.devService.requestBy(ADMIN_PATH.PRODUCTS_WITHOUT_INGREDIENTS+'/by-product',this.id_producto)
      .subscribe(
        res => {
          this.sinIngredientes = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  onConfigSinIngrediente(){
    this.openModalConfigSinIngrediente(
      'Configurar excepción',
      true,
      ADMIN_PATH.PRODUCTS_WITHOUT_INGREDIENTS,
      {
        id_producto:this.id_producto,
        id_sucursal:this.id_sucursal
      }
    );
  }

  onDeleteWithoutIngredient(id_ingredient){
    try {
      this.devService.requestDeleteParams(ADMIN_PATH.PRODUCTS_WITHOUT_INGREDIENTS,this.id_producto,id_ingredient)
      .subscribe(
        res => {
          this.getSinIngredientesByProducto();
        },
        err => console.error(err)
      )
    } catch (error) {
      console.log(error);
    }
  }


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
