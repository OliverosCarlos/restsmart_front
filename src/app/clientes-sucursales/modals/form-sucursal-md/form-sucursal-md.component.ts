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
    selector: 'app-form-sucursal-md',
    templateUrl: './form-sucursal-md.component.html',
    styleUrls: ['./form-sucursal-md.component.scss']
})

export class FormSucursalModalComponent implements OnInit {

    modalConfig: ModalConfig;
    sucursalForm: FormGroup;

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
        this.sucursalForm = new FormGroup({
            name_branch_office: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            description_branch_office: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            //url_img_sucursal: new FormControl(null, [Validators.required, Validators.maxLength(250)])
        });
    }

    get SForm(){ return this.sucursalForm.controls; }

    ngOnInit() {
        if (this.modalConfig.data) {
            this.sucursalForm.get('name_branch_office').setValue(this.modalConfig.data.name_branch_office);
            this.sucursalForm.get('description_branch_office').setValue(this.modalConfig.data.description_branch_office);
            this.imgEdit = this.modalConfig.data.url_image_branch_office;
        }
    }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        const sucursalFormWithImg = new FormData();

        sucursalFormWithImg.append('name_branch_office',this.SForm.name_branch_office.value);
        sucursalFormWithImg.append('description_branch_office',this.SForm.description_branch_office.value);
        sucursalFormWithImg.append('image', this.selectedFile, this.selectedFile.name);

        this.devService.requestBody(ADMIN_PATH.BRANCH_OFFICES,sucursalFormWithImg).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );
    }

    update() {
        const sucursalFormWithImg = new FormData();

        sucursalFormWithImg.append('name_branch_office',this.SForm.name_branch_office.value);
        sucursalFormWithImg.append('description_branch_office',this.SForm.description_branch_office.value);
        //sucursalFormWithImg.append('image', this.selectedFile, this.selectedFile.name);

        this.devService.requestBodyBy(ADMIN_PATH.BRANCH_OFFICES,sucursalFormWithImg,this.modalConfig.data._id).subscribe(
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
    OnUploadFile(){
      //console.log(this.selecetdFile);
    }
}
