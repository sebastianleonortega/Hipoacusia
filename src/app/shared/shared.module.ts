import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SwiperModule} from "swiper/angular";
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CarrouselComponent } from './layouts/carrousel/carrousel.component';
import { HeaderMedicalComponent } from './layouts/header-medical/header-medical.component';
import {RouterModule} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MessageErrorsDirective} from "./directives/field-errors/directive/message-errors.directive";
import {InputMaskDirective} from "./directives/input-mask/input-mask.directive";
import {TemplateErrorComponent} from "./directives/field-errors/template-error/template-error.component";
import { LoadingComponent } from './layouts/loading/loading.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarrouselComponent,
    HeaderMedicalComponent,
    InputMaskDirective,
    MessageErrorsDirective,
    TemplateErrorComponent,
    LoadingComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    HeaderComponent,
    FooterComponent,
    CarrouselComponent,
    HeaderMedicalComponent,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputMaskDirective,
    MessageErrorsDirective,
    TemplateErrorComponent,
    LoadingComponent


  ]
})
export class SharedModule { }
