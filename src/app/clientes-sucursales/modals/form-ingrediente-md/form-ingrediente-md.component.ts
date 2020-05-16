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
    selector: 'app-form-ingrediente-md',
    templateUrl: './form-ingrediente-md.component.html',
    styleUrls: ['./form-ingrediente-md.component.scss']
})

export class FormIngredienteModalComponent implements OnInit {

    modalConfig: ModalConfig;
    ingredienteForm: FormGroup;

    selectedFile: File;
    imagePreview: string | ArrayBuffer;

    imgEdit = '';
    
    @Output() action = new EventEmitter();


    constructor(
        //private handler: Handler,
        public modalRef: BsModalRef,
        private modalService: BsModalService,
        private devService:DevServiceService,
    ) {
        this.modalConfig = this.modalService.config.initialState;
        this.ingredienteForm = new FormGroup({
            name_ingredient: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            description_ingredient: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            id_branch_office: new FormControl(this.modalConfig.data)
            //url_img_ingrediente: new FormControl(null, [Validators.required, Validators.maxLength(250)])
        });
    }

    get IForm(){ return this.ingredienteForm.controls; }

    ngOnInit() {
        if (this.modalConfig.data) {
            this.ingredienteForm.get('name_ingredient').setValue(this.modalConfig.data.name_ingredient);
            this.ingredienteForm.get('description_ingredient').setValue(this.modalConfig.data.description_ingredient);
            this.imgEdit = this.modalConfig.data.url_image_ingredient;
        }
    }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        const ingredienteFormWithImg = new FormData();

        ingredienteFormWithImg.append('name_ingredient',this.IForm.name_ingredient.value);
        ingredienteFormWithImg.append('description_ingredient',this.IForm.description_ingredient.value);
        ingredienteFormWithImg.append('image', this.selectedFile, this.selectedFile.name);
        ingredienteFormWithImg.append('id_branch_office',this.IForm.id_branch_office.value);

        this.devService.requestBody(this.modalConfig.requestPath,ingredienteFormWithImg).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );
    }

    update() {
        console.log(this.modalConfig.data);
        const ingredienteFormWithImg = new FormData();

        ingredienteFormWithImg.append('name_ingredient',this.IForm.name_ingredient.value);
        ingredienteFormWithImg.append('description_ingredient',this.IForm.description_ingredient.value);
        // ingredienteFormWithImg.append('image', this.selectedFile, this.selectedFile.name);
        //ingredienteFormWithImg.append('id_branch_office',this.IForm.id_branch_office.value);

        this.devService.requestBodyBy(this.modalConfig.requestPath,ingredienteFormWithImg,this.modalConfig.data._id).subscribe(
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

    onFileUpload(event){
        console.log(event.target.files);
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
        this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
}
