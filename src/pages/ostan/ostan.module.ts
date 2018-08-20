import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OstanPage } from './ostan';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [OstanPage],
    imports: [ IonicPageModule.forChild(OstanPage), PipesModule],
    providers:[]
})
export class OstanModule { }