import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaptionDoctorPage } from './caption.doctor';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [CaptionDoctorPage],
    imports: [ IonicPageModule.forChild(CaptionDoctorPage),PipesModule],
    providers:[]
})
export class CaptionDoctorModule { }