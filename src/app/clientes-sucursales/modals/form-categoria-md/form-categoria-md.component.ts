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
    selector: 'app-form-categoria-md',
    templateUrl: './form-categoria-md.component.html',
    styleUrls: ['./form-categoria-md.component.scss']
})

export class FormCategoriaModalComponent implements OnInit {

    modalConfig: ModalConfig;
    categoriaForm: FormGroup;

    @Output() action = new EventEmitter();


    constructor(
        public modalRef: BsModalRef,
        private modalService: BsModalService,
        private devService: DevServiceService,
    ) {
        this.modalConfig = this.modalService.config.initialState;
        this.categoriaForm = new FormGroup({
            name_category: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            description_category: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            id_branch_office: new FormControl(this.modalConfig.data)
        });
    }

    get CForm() { return this.categoriaForm.controls; }

    ngOnInit() {
        if (this.modalConfig.data) {
            this.categoriaForm.get('name_category').setValue(this.modalConfig.data.name_category);
            this.categoriaForm.get('description_category').setValue(this.modalConfig.data.description_category);
        }
    }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        console.log({from:this.categoriaForm.value});
        this.devService.requestBody(this.modalConfig.requestPath, this.categoriaForm.value).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );

    }

    update() {
        this.devService.requestBodyBy(this.modalConfig.requestPath, this.categoriaForm.value, this.modalConfig.data._id).subscribe(
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
