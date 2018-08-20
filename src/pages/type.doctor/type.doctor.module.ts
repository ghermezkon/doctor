import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypeDoctorPage } from './type.doctor';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [TypeDoctorPage],
    imports: [ IonicPageModule.forChild(TypeDoctorPage),PipesModule],
    providers:[]
})
export class TypeDoctorModule { }