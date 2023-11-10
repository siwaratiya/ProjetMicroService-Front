import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VitrineRoutingModule } from './vitrine-routing.module';
import { VitrineComponent } from './vitrine.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { VitrineLayoutComponent } from './vitrine-layout/vitrine-layout.component';


@NgModule({
    declarations: [
        VitrineComponent,
        FooterComponent,
        HeaderComponent,
        VitrineLayoutComponent
    ],
    exports: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        VitrineRoutingModule
    ]
})
export class VitrineModule { }
