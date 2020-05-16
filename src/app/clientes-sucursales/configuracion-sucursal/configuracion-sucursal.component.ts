import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ADMIN_PATH } from 'src/app/utils/enums/pathRequest.enum';
import { DevServiceService } from 'src/app/providers/dev-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormCategoriaModalComponent } from '../modals/form-categoria-md/form-categoria-md.component';
import { FormIngredienteModalComponent } from '../modals/form-ingrediente-md/form-ingrediente-md.component';
@Component({
  selector: 'app-configuracion-sucursal',
  templateUrl: './configuracion-sucursal.component.html',
  styleUrls: ['./configuracion-sucursal.component.scss']
})
export class ConfiguracionSucursalComponent implements OnInit {
  bsModalRef: BsModalRef;

  categories:any = [];
  ingredients:any = [];
  id_branch_office = '';
  constructor( 
    private devService:DevServiceService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
    ) { 
      
    }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.id_branch_office = params.id_sucursal;
    this.getCategoriasBySucursal();
    this.getIngredientesBySucursal();
  }

  getCategoriasBySucursal(){
    this.devService.requestBy(ADMIN_PATH.CATEGORIES+'/by-branch-office',this.id_branch_office)
      .subscribe(
        res => {
          this.categories = res;
        },
        err => console.error(err)
      );
  }

  onCreateCategoria(){
    this.openModalCategoria('Crear categoria',true,ADMIN_PATH.CATEGORIES,this.id_branch_office);
  }

  onEditCategoria(data){
    this.openModalCategoria('Editar categoria',false,ADMIN_PATH.CATEGORIES,data);
  }

  onDeleteCategoria(id_categoria){
   try {
     this.devService.requestDelete(ADMIN_PATH.CATEGORIES,id_categoria)
     .subscribe(
       res => {
         this.getCategoriasBySucursal();
       },
       err => console.error(err)
     )
   } catch (error) {
     console.log(error);
   }
  }

  getIngredientesBySucursal(){
    this.devService.requestBy(ADMIN_PATH.INGREDIENTS+'/by-branch-office',this.id_branch_office)
      .subscribe(
        res => {
          this.ingredients = res;
        },
        err => console.error(err)
      );
  }

  onCreateIngrediente(){
    this.openModalIngrediente('Crear ingrediente',true,ADMIN_PATH.INGREDIENTS,this.id_branch_office);
  }

  onEditIngrediente(data){
    this.openModalIngrediente('Editar ingrediente',false,ADMIN_PATH.INGREDIENTS,data);
  }

  onDeleteIngrediente(id_ingredient){
   try {
     this.devService.requestDelete(ADMIN_PATH.INGREDIENTS,id_ingredient)
     .subscribe(
       res => {
        this.getIngredientesBySucursal();
       },
       err => console.error(err)
     )
   } catch (error) {
     console.log(error);
   }
  }

  private openModalCategoria(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormCategoriaModalComponent, {
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
      this.getCategoriasBySucursal();
    });
  }

  private openModalIngrediente(title: string, create: boolean, requestPath: string, data?: any) {
    const bsModalRef = this.modalService.show(FormIngredienteModalComponent, {
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
      this.getIngredientesBySucursal();
    });
  }


}
