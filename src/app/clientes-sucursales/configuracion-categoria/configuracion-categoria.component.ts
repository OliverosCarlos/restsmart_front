import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ADMIN_PATH } from 'src/app/utils/enums/pathRequest.enum';
import { DevServiceService } from 'src/app/providers/dev-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormProductoModalComponent } from '../modals/form-producto-md/form-producto-md.component';
@Component({
  selector: 'app-configuracion-categoria',
  templateUrl: './configuracion-categoria.component.html',
  styleUrls: ['./configuracion-categoria.component.scss']
})
export class ConfiguracionCategoriaComponent implements OnInit {
  bsModalRef: BsModalRef;

  products:any = [];
  id_category = '';
  constructor( 
    private devService:DevServiceService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
    ) { 
      
    }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.id_category = params.id_categoria;
    this.getProductosByCategoria();
  }

  getProductosByCategoria(){
    this.devService.requestBy(ADMIN_PATH.PRODUCTS+'/by-category',this.id_category)
      .subscribe(
        res => {
          this.products = res;
        },
        err => console.error(err)
      );
  }

  onCreate(){
    this.openModal('Crear producto',true,'ruta',this.id_category);
  }

  onEdit(data){
    this.openModal('Editar producto',false,'ruta',data);
  }

  onDelete(id_producto){
   try {
     this.devService.requestDelete(ADMIN_PATH.PRODUCTS,id_producto)
     .subscribe(
       res => {
         this.getProductosByCategoria();
       },
       err => console.error(err)
     )
   } catch (error) {
     console.log(error);
   }
  }

  private openModal(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormProductoModalComponent, {
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
      this.getProductosByCategoria();
    });
  }


}
