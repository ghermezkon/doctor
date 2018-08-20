import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorPage } from './doctor';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [DoctorPage],
    imports: [ IonicPageModule.forChild(DoctorPage), PipesModule],
    providers:[]
})
export class DoctorModule { }