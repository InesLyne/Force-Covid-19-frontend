import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 *  PRIMENG
 */

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import {FocusTrapModule} from 'primeng/focustrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    DropdownModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    DialogModule,
    PanelModule,
    MessageModule,
    ToastModule,
    FocusTrapModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    DropdownModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    DialogModule,
    PanelModule,
    MessageModule,
    ToastModule,
    FocusTrapModule
  ]
})
export class ShareModule { }
