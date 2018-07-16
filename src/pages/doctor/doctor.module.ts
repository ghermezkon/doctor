import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorPage } from './doctor';

@NgModule({
    declarations: [DoctorPage],
    imports: [ IonicPageModule.forChild(DoctorPage)],
    providers:[]
})
export class DoctorModule { }