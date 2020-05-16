import { Component, OnInit } from '@angular/core';

import { ADMIN_PATH } from 'src/app/utils/enums/pathRequest.enum';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DevServiceService } from 'src/app/providers/dev-service.service';
import { FormSucursalModalComponent } from '../modals/form-sucursal-md/form-sucursal-md.component';

@Component({
  selector: 'app-all-sucursales',
  templateUrl: './all-sucursales.component.html',
  styleUrls: ['./all-sucursales.component.scss']
})
export class AllSucursalesComponent implements OnInit {
  bsModalRef: BsModalRef;

  sucursales:any = [];

  constructor( 
    private devService:DevServiceService,
    private modalService: BsModalService,
    ) { 
      
    }

  ngOnInit() {
    this.getSucursales();
  }

  getSucursales(){
    this.devService.request(ADMIN_PATH.BRANCH_OFFICES)
      .subscribe(
        res => {
          this.sucursales = res;
        },
        err => console.error(err)
      );
  }

  onCreate(){
    this.openModal('Crear sucursal',true,'ruta');
  }

  onEdit(data){
    this.openModal('Editar sucursal',false,'ruta',data);
  }

  onDelete(id_sucursal){
   try {
     this.devService.requestDelete(ADMIN_PATH.BRANCH_OFFICES,id_sucursal)
     .subscribe(
       res => {
         console.log(res);
         this.getSucursales();
       },
       err => console.error(err)
     )
   } catch (error) {
     console.log(error);
   }
  }

  private openModal(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormSucursalModalComponent, {
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
      this.getSucursales();
    });
  }
}
