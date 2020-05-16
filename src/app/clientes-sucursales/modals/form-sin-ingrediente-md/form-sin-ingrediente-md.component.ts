import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ModalConfig } from 'src/app/types/modalConfig.type';
import { FormGroup, Validators, FormControl } from '@angular/forms';
// import { Utils } from 'src/app/utils/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import swal from 'sweetalert2';
// import { CrudService } from 'src/app/providers/api/crud.service';
// import { Router } from '@angular/router';
// import { Handler } from 'src/app/utils/handler';
import { PATH } from 'src/app/utils/enums/pathRequest.enum';
import { DevServiceService } from 'src/app/providers/dev-service.service';

@Component({
    selector: 'app-form-sin-ingrediente-md',
    templateUrl: './form-sin-ingrediente-md.component.html',
    styleUrls: ['./form-sin-ingrediente-md.component.scss']
})

export class FormSinIngredienteModalComponent implements OnInit {

    modalConfig: ModalConfig;
    sinIngredienteForm: FormGroup;
    ingredientes:any = []
    @Output() action = new EventEmitter();


    constructor(
        public modalRef: BsModalRef,
        private modalService: BsModalService,
        private devService: DevServiceService,
    ) {
        this.modalConfig = this.modalService.config.initialState;
        this.sinIngredienteForm = new FormGroup({
            id_producto: new FormControl(this.modalConfig.data.id_producto),
            id_ingrediente: new FormControl('',Validators.required),
        });
    }

    get IForm() { return this.sinIngredienteForm.controls; }

    ngOnInit() {
        if (this.modalConfig.data) {
            this.sinIngredienteForm.get('id_producto').setValue(this.modalConfig.data.id_producto);
            this.sinIngredienteForm.get('id_ingrediente').setValue(this.modalConfig.data.id_ingrediente);
        }
        this.getIngredientesBySucursal();
    }

    getIngredientesBySucursal(){
        this.devService.requestBy(PATH.INGREDIENTES+'/por-sucursal',this.modalConfig.data.id_sucursal)
          .subscribe(
            res => {
              this.ingredientes = res;
            },
            err => console.error(err)
          );
      }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        console.log(this.sinIngredienteForm);
        this.devService.requestBody(this.modalConfig.requestPath, this.sinIngredienteForm.value).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );

    }

    update() {
        // this.devService.requestBodyBy(this.modalConfig.requestPath, this.sinIngredienteForm, this.modalConfig.data.id_sucursal).subscribe(
        //     res => {
        //         this.action.emit();
        //         this.modalRef.hide();
        //     },
        //     err => console.error(err)
        // );
    }

    onClose() {
        this.modalRef.hide();
        // if (this.examenForm.dirty) {
        //     let emptyInputs = true;

        //     for (const key in this.examenForm.controls) {
        //         if (this.examenForm.controls[key].valid) {
        //             emptyInputs = false;
        //             break;
        //         }
        //     }
        //     if (emptyInputs) {
        //         this.modalRef.hide();
        //     } else {
        //         swal(Utils.getConfirmCloseModal()).then(result => {
        //             if (result.value) {
        //                 this.modalRef.hide();
        //             }
        //         });
        //     }
        // } else {
        //     this.modalRef.hide();
        // }
    }

}
