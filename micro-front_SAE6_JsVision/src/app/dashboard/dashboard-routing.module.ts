import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {ProductComponent} from "./product/product.component";
import { SignUpComponent } from './user/authentication/sign-up/sign-up.component';
import { SignInComponent } from './user/authentication/sign-in/sign-in.component';
import { SuccessSignUpComponent } from './user/package-components/success-sign-up/success-sign-up.component';
import { PageErrorComponent } from './user/package-components/page-error/page-error.component';
import { FormForgotPasswordComponent } from './user/account/form-forgot-password/form-forgot-password.component';
import { UpdatePasswordForgotComponent } from './user/account/update-password-forgot/update-password-forgot.component';
import { ProfileAccountComponent } from './user/account/profile-account/profile-account.component';
import { EditGlobalComponent } from './user/account/edit-global/edit-global.component';
import { GuardUserFrontService } from '../core/services/user/guard-user-front-service';
import { SampleComponent } from './sample/sample.component';
import {TestComponent} from "./test/test.component";
import {CommandeComponent} from "./commande/commande.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {StockComponent} from "./stock/stock.component";
import {DetailsStockComponent} from "./stock/details-stock/details-stock.component";

const routes: Routes = [
  {
    path:'',component:AdminLayoutComponent,
    children: [{
      path:'',component:ProfileAccountComponent
    }]
  },
  {
    path:'product',component:AdminLayoutComponent,
    children: [{
      path:'',component:ProductComponent
    }]
  },
  {
    path:'sample',component:AdminLayoutComponent,
    children: [{
      path:'',component:SampleComponent
    }]
  },
  {
    path:'test',component:AdminLayoutComponent,
    children: [{
      path:'',component:TestComponent
    }]
  },
  {
    path:'commande',component:AdminLayoutComponent,
    children: [
      {
        path: '',component: CommandeComponent
      }

    ]
  },
  {
    path:'appointment', component:AdminLayoutComponent,
    children: [{
      path:'', component:AppointmentComponent
    }]
  },
  {
    path:'stock',component:AdminLayoutComponent,
    children: [{
      path: '',component: StockComponent
    },
    {
      path: 'details/:id',component: DetailsStockComponent
    }
    ]
  }




 // -----------  Start User Service  ---------------------
  ,{
    path: 'sign-up',
    component: SignUpComponent
  },{
    path: 'sign-in',
    component: SignInComponent
  },{
    path: 'success-sign-up/:email',
    component: SuccessSignUpComponent,
  },{
    path: 'page-error',
    component: PageErrorComponent,
  },
  {
    path: 'forgot-password',
    component: FormForgotPasswordComponent
  },
  {
    path: 'update-password-forgot/:username/:code',
    component: UpdatePasswordForgotComponent
  },
  {
    path: 'user', canActivateChild : [GuardUserFrontService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'profile/:username',
        component: ProfileAccountComponent
      }
    ]
  },
  {
    path: 'user/account', canActivateChild : [GuardUserFrontService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'update-profile',
        component: EditGlobalComponent
      }
    ]
  }
 // -----------  End User Service  ---------------------

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
