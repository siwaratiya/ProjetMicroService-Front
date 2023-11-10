import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ProductComponent } from './product/product.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputNumberModule} from "primeng/inputnumber";
import {RadioButtonModule} from "primeng/radiobutton";
import {DialogModule} from "primeng/dialog";
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { SampleComponent } from './sample/sample.component';
import { AddSampleComponent } from './sample/add-sample/add-sample.component';
import { EditSampleComponent } from './sample/edit-sample/edit-sample.component';
import { TestComponent } from './test/test.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';
import { SignUpComponent } from './user/authentication/sign-up/sign-up.component';
import { SignInComponent } from './user/authentication/sign-in/sign-in.component';
import { ProfileAccountComponent } from './user/account/profile-account/profile-account.component';
import { EditGlobalComponent } from './user/account/edit-global/edit-global.component';
import { MessageBoxConfirmationStandartComponent } from './user/package-components/message-box-confirmation-standart/message-box-confirmation-standart.component';
import { MessageBoxResponseComponent } from './user/package-components/message-box-response/message-box-response.component';
import { MessageBoxUploadImgComponent } from './user/package-components/message-box-upload-img/message-box-upload-img.component';
import { PageErrorComponent } from './user/package-components/page-error/page-error.component';
import { SuccessSignUpComponent } from './user/package-components/success-sign-up/success-sign-up.component';
import { FormForgotPasswordComponent } from './user/account/form-forgot-password/form-forgot-password.component';
import { UpdatePasswordForgotComponent } from './user/account/update-password-forgot/update-password-forgot.component';
import { PositiveNumberValidatorDirective } from './user/libraries/PositiveNumberValidatorDirective';
import { DateNowValidatorDirective } from './user/libraries/DateNowValidatorDirective';
import { ExperienceRangeValidatorDirective } from './user/libraries/ExperienceRangeValidatorDirective';
import { SameValueValidatorDirective } from './user/libraries/SameValueValidatorDirective';
import { GuardUserFrontService } from '../core/services/user/guard-user-front-service';
import { CommandeComponent } from './commande/commande.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { EditCommandeComponent } from './commande/edit-commande/edit-commande.component';
import { CommandeLineComponent } from './commande/commande-line/commande-line.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './appointment/update-appointment/update-appointment.component';
import {CalendarModule} from "primeng/calendar";
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { EditStockComponent } from './stock/edit-stock/edit-stock.component';
import { DetailsStockComponent } from './stock/details-stock/details-stock.component';
import { LeaveAuthorisationComponent } from './leave-authorisation/leave-authorisation.component';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    AdminLayoutComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    LeaveAuthorisationComponent,
    SampleComponent,
    AddSampleComponent,
    EditSampleComponent,
    TestComponent,
    AddTestComponent,
    EditTestComponent,

    // -----------  Start User Service  ---------------------
    SignUpComponent,
    SignInComponent,
    ProfileAccountComponent,
    EditGlobalComponent,
    MessageBoxConfirmationStandartComponent,
    MessageBoxResponseComponent,
    MessageBoxUploadImgComponent,
    PageErrorComponent,
    SuccessSignUpComponent,
    FormForgotPasswordComponent,
    UpdatePasswordForgotComponent,
    PositiveNumberValidatorDirective,
    DateNowValidatorDirective,
    ExperienceRangeValidatorDirective,
    SameValueValidatorDirective,
    // -----------  End User Service  ---------------------

    EditProductComponent,
    CommandeComponent,
    AddCommandeComponent,
    EditCommandeComponent,
    CommandeLineComponent,
    AppointmentComponent,
    AddAppointmentComponent,
    UpdateAppointmentComponent,
    EditProductComponent,
    StockComponent,
    AddStockComponent,
    EditStockComponent,
    DetailsStockComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ToastModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    TagModule,
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    CalendarModule
  ],
  providers: [
       // -----------  Start User Service  ---------------------
    GuardUserFrontService
       // -----------  End User Service  ---------------------
  ]
})
export class DashboardModule {}
