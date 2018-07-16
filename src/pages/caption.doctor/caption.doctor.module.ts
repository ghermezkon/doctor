import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaptionDoctorPage } from './caption.doctor';

@NgModule({
    declarations: [CaptionDoctorPage],
    imports: [ IonicPageModule.forChild(CaptionDoctorPage)],
    providers:[]
})
export class CaptionDoctorModule { }