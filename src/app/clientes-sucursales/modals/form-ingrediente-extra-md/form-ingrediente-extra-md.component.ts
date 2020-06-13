import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ModalConfig } from 'src/app/types/modalConfig.type';
import { FormGroup, Validators, FormControl } from '@angular/forms';
// import { Utils } from 'src/app/utils/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import swal from 'sweetalert2';
// import { CrudService } from 'src/app/providers/api/crud.service';
// import { Router } from '@angular/router';
// import { Handler } from 'src/app/utils/handler';
import { ADMIN_PATH } from 'src/app/utils/enums/pathRequest.enum';
import { DevServiceService } from 'src/app/providers/dev-service.service';

@Component({
    selector: 'app-form-ingrediente-extra-md',
    templateUrl: './form-ingrediente-extra-md.component.html',
    styleUrls: ['./form-ingrediente-extra-md.component.scss']
})

export class FormIngredienteExtraModalComponent implements OnInit {

    modalConfig: ModalConfig;
    ingredienteExtraForm: FormGroup;
    ingredients:any = []
    @Output() action = new EventEmitter();


    constructor(
        public modalRef: BsModalRef,
        private modalService: BsModalService,
        private devService: DevServiceService,
    ) {
        this.modalConfig = this.modalService.config.initialState;
        this.ingredienteExtraForm = new FormGroup({
            id_product: new FormControl(this.modalConfig.data.id_producto),
            id_ingredient: new FormControl('',Validators.required),
            price_ingredient: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        });
    }

    get IForm() { return this.ingredienteExtraForm.controls; }

    ngOnInit() {
        if (this.modalConfig.create) {
            this.ingredienteExtraForm.get('id_product').setValue(this.modalConfig.data.id_producto);
            this.ingredienteExtraForm.get('id_ingredient').setValue(this.modalConfig.data.id_ingredient);
            this.ingredienteExtraForm.get('price_ingredient').setValue(this.modalConfig.data.price_ingredient);
        }
        this.getIngredientesBySucursal();
    }

    getIngredientesBySucursal(){
        this.devService.requestBy(ADMIN_PATH.INGREDIENTS+'/by-branch-office',this.modalConfig.data.id_sucursal)
          .subscribe(
            res => {
                this.ingredients = res;
            },
            err => console.error(err)
          );
      }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        console.log(this.ingredienteExtraForm.value);
        this.devService.requestBody(this.modalConfig.requestPath, this.ingredienteExtraForm.value).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );
    }

    update() {
        this.devService.requestBodyByParams(this.modalConfig.requestPath, this.ingredienteExtraForm.value, this.modalConfig.data.id_product, this.modalConfig.data.id_ingredient).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );
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
