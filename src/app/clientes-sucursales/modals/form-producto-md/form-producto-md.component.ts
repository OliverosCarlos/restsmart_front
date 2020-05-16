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
    selector: 'app-form-producto-md',
    templateUrl: './form-producto-md.component.html',
    styleUrls: ['./form-producto-md.component.scss']
})

export class FormProductoModalComponent implements OnInit {

    modalConfig: ModalConfig;
    productoForm: FormGroup;

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
        this.productoForm = new FormGroup({
            name_product: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            description_product: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            price_product: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            id_category: new FormControl(this.modalConfig.data)
            //url_img_producto: new FormControl(null, [Validators.required, Validators.maxLength(250)])
        });
    }

    get PForm(){ return this.productoForm.controls; }

    ngOnInit() {
        if (this.modalConfig.data) {
            this.productoForm.get('name_product').setValue(this.modalConfig.data.name_product);
            this.productoForm.get('description_product').setValue(this.modalConfig.data.description_product);
            this.productoForm.get('price_product').setValue(this.modalConfig.data.price_product);
            this.imgEdit = this.modalConfig.data.url_image_product;
        }
    }

    formValid() {
        this.modalConfig.create ? this.save() : this.update();
    }

    save() {
        const productoFormWithImg = new FormData();

        productoFormWithImg.append('name_product',this.PForm.name_product.value);
        productoFormWithImg.append('description_product',this.PForm.description_product.value);
        productoFormWithImg.append('price_product',this.PForm.price_product.value);
        productoFormWithImg.append('image', this.selectedFile, this.selectedFile.name);
        productoFormWithImg.append('id_category',this.PForm.id_category.value);

        this.devService.requestBody(ADMIN_PATH.PRODUCTS,productoFormWithImg).subscribe(
            res => {
                this.action.emit();
                this.modalRef.hide();
            },
            err => console.error(err)
        );
    }

    update() {
        const productoFormWithImg = new FormData();

        productoFormWithImg.append('name_product',this.PForm.name_product.value);
        productoFormWithImg.append('description_product',this.PForm.description_product.value);
        productoFormWithImg.append('price_product',this.PForm.price_product.value);
        //productoFormWithImg.append('image', this.selectedFile, this.selectedFile.name);
        //productoFormWithImg.append('id_category',this.PForm.id_category.value);
        this.devService.requestBodyBy(ADMIN_PATH.PRODUCTS,productoFormWithImg,this.modalConfig.data._id).subscribe(
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
