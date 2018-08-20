import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypeWorkPage } from './type.work';
import { PipesModule } from '../../../util/pipes.module';

@NgModule({
    declarations: [TypeWorkPage],
    imports: [ IonicPageModule.forChild(TypeWorkPage), PipesModule],
    providers:[]
})
export class TypeWorkModule { }