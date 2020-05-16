// import { FormsUtilsModule } from 'src/app/forms/forms-utils.module';

/*****************************
 * ANGULAR MATERIAL *
 *****************************/
// tslint:disable-next-line:max-line-length
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    // FormsUtilsModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatBadgeModule,
    MatIconModule,
    MatSliderModule,
    MatChipsModule,
    MatSortModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatListModule,
    MatStepperModule

  ]
})
export class AngularMaterialModule { }

